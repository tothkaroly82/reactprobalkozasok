import MaterialTable from 'material-table'
import React from 'react'
import { BASICDATA } from '../util/dataFromFile'
import { CSVReader } from 'react-papaparse'
import SimpleSelect from './variableTypeSelector'
import ld from 'lodash'

const buttonRef = React.createRef()

export default class BasicSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: '' }
  }

  componentDidMount () {
  }
  handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
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
      columname: item,
      variabletype: 'a'
    }))
    this.setState({data:mappingHeader})
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
                Browe file
              </button>
              <div>{file && file.name}</div>
              <button onClick={this.handleRemoveFile}>Remove</button>
            </aside>
          )}
        </CSVReader>
        <MaterialTable
          title='Select column'
          columns={[
            { title: 'Column Name', field: 'columnname' },
            { title: 'Variable type', field: 'variabletype' }
          ]}
          data={this.state.data}
          options={{
            selection: true
          }}
        />{' '}
      </>
    )
  }
}
