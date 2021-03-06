import MaterialTable, { MTableToolbar, CsvBuilder } from 'material-table'
import React from 'react'
import { CSVReader } from 'react-papaparse'
import Papa from 'papaparse'
import Fs from 'browserify-fs'
import VariableSelect from './variableTypeSelector'

//------------------------------
import { forwardRef } from 'react'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { Progress } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Next } from 'react-bootstrap/esm/PageItem'

const usestate = React.useState

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}
//---------------------------------
const buttonRef = React.createRef()
export default class BasicSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: [], userSelecteVariables: [], selectedFile: [] }
    this.handleOnFileLoad = this.handleOnFileLoad.bind(this)
    this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.selectVariables = this.selectVariables.bind(this)
  }

  handleOpenDialog = e => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnRemoveFile () {}

  handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  handleOnFileLoad = (data, file) => {
    const csvHeaderArray = data[0].data
    const mappingHeader = csvHeaderArray.map(item => ({
      columnname: item,
      variabletype: <VariableSelect />,
      variabletype1: 2
    }))

    let filelist = []
    filelist.push(file)
    this.setState({
      data: mappingHeader,
      selectedFile: filelist
    })
  }

  selectVariables = rowdata => {
    //itt kellene nekem a variabletype value prop-ja, ami tulajdonkeppen a SimpleSelect statje, legalabbis asszem :)
    console.log('rowdata:', rowdata)
    console.log('rowdata[0].variabletype', rowdata[0].variabletype)
    console.log('rowdata[0].variabletype.selected', rowdata[0].variabletype.selected)
    console.log('rowdata[0].variabletype.props', rowdata[0].variabletype.props)
    console.log('rowdata[0].variabletype.props.selected', rowdata[0].variabletype.props.selected)

    const reducedData = rowdata.map(item => ({
      columnname: item.columnname,
      variabletype: item.variabletype
    }))

    this.setState({
      userSelecteVariables: reducedData
    })
  }

  clearState = () => {
    this.setState({ data: [], userSelecteVariables: [], selectedFile: [] })
  }

  sendSelectedVariableToServer = () => {
    ///console.log('userdata')
    // add json with selected variables by user
    const csvHeader = Papa.unparse(
      JSON.stringify(this.state.userSelecteVariables)
    )
    // Papa.unparse( )

    // Fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
    //   if (err) throw err;
    //   console.log('File is created successfully.');
    // })

    ///console.log(csvHead)
    //console.log(csvHeader)
    ///const csvHeader = new File(csvHeader1, "nev");

    // const content = Fs.readFileSync(csvHeader ,'utf8')
    ///Fs.writeFileSync('todos.csv', csvHeader)
    //  Fs.writeFile("thing.json", csvHeader, function(err, result) {
    //      if(err) console.log('error', err);
    //  });

    // console.log(content)

    // this.state.selectedFile.push(content)
    console.log(this.state.selectedFile)

    const data = new FormData()
    if (this.state.selectedFile.length === 0) {
      toast.error('select file please')
    } else {
      for (let x = 0; x < this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
      }
      data.append('file', csvHeader)
      console.log('tenyleg igy nez', data)
      axios
        .post('http://localhost:8000/uploadFile', data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            })
          }
        })
        .then(res => {
          // then print response status
          toast.success('upload success')
          this.clearState()
        })
        .catch(err => {
          // then print response status
          toast.error('upload fail')
        })
    }
  }
  render () {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button type='button' onClick={this.handleOpenDialog}>
                Browse file
              </button>
              <div>{file && file.name}</div>
              <button onClick={this.handleRemoveFile}>Remove</button>
            </aside>
          )}
        </CSVReader>
        <MaterialTable
          icons={tableIcons}
          title='Select column'
          data={this.state.data}
          columns={[
            { title: 'Column Name', field: 'columname' },
            { title: 'Variable type', field: 'variabletype' },
            { title: 'Variable type', field: 'variabletype1' }
          ]}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div>
                  <button
                    type='button'
                    onClick={this.sendSelectedVariableToServer}
                  >
                    Send data to server
                  </button>
                </div>
              </div>
            )
          }}
          onSelectionChange={this.selectVariables}
          options={{
            selection: true,
            search: false,
            pageSize: 10,
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF'
            },
            rowStyle: {
              backgroundColor: '#EEE'
            }
          }}
        />{' '}
      </>
    )
  }
}
