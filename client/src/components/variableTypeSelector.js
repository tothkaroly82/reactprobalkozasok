import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default class BasicSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected:'' }
    //this.handleChange=this.handleChange.bind(this)
  }

  handleChange = event => {
    console.log('target.name:', event.target.name)
    console.log('target.value:', event.target.value)
    const targetvalue=event.target.value
    console.log("targetvalue:", targetvalue)

    this.setState({
      selected: 'target'    })
    console.log('Simple select esemeny, event.target.value', event.target.value)
    console.log('this.state.selected:', this.state.selected)
    console.log('this.state:', this.state)
    console.log('this.props.value',this.props.value)
    console.log('this.props.select',this.props.selected)
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <FormControl>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={this.state.selected}
            onChange={this.handleChange}
          >
            <MenuItem value="target">Target</MenuItem>
            <MenuItem value="independent">Independent</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
}
