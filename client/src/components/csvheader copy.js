import MaterialTable, { MTableToolbar, CsvBuilder } from 'material-table'
import React from 'react'
import { CSVReader } from 'react-papaparse'
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
    this.state = { data: [], userSelecteVariables: [] }
    this.handleOnFileLoad = this.handleOnFileLoad.bind(this)
    this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this)
    this.selectVariables = this.selectVariables.bind(this)
  }

  handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnRemoveFile () {
    this.setState({ data: [] })
  }
  handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  handleOnFileLoad (data) {
    const csvHeaderArray = data[0].data
    const mappingHeader = csvHeaderArray.map(item => ({
      columnname: item,
      variabletype: <VariableSelect />
    }))
    this.setState({
      data: mappingHeader
    })
  }
  selectVariables (rowdata) {
    console.log(rowdata)
    const reducedData = rowdata.map(item => ({
      columnname: item.columnname
    }))
    this.setState({
      userSelecteVariables: reducedData
    })
  }
  sendSelectedVariableToServer = () => {
    console.log(JSON.stringify(this.state.userSelecteVariables))
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
            { title: 'Column Name', field: 'columnname' },
            { title: 'Variable type', field: 'variabletype' }
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
            backgroundColor: '#EEE',
          }
          
          }}
        />{' '}
      </>
    )
  }
}
