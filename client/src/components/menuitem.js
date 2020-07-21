import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  TextField
} from "@material-ui/core";

class SimpleAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "Specification",
          field: "Specification",
          editComponent: x => (
            <FormControl variant="outlined">
              <InputLabel>Prefix</InputLabel>
              <Select
                id="Prefix"
                value={x.value}
                onChange={e => handleChangeTEST(e, x)}
                input={<OutlinedInput name="Prefix" />}
              >
                <MenuItem key={1} value="Not selected">
                  Not selected
                </MenuItem>
                <MenuItem key={2} value="Mr">
                  Mr.
                </MenuItem>
                <MenuItem key={3} value="Mrs">
                  Mrs.
                </MenuItem>
                <MenuItem key={4} value="Ms">
                  Ms.
                </MenuItem>
                <MenuItem key={5} value="Dr">
                  Dr.
                </MenuItem>
              </Select>
            </FormControl>
          )
        },
        {
          title: "Info",
          field: "Info",
          editComponent: x => (
            <TextField
              fullWidth
              name="Info"
              onChange={e => handleChangeEdit(e, x)}
              value={x.value || ""}
              variant="outlined"
            />
          )
        }
      ]
    };
  }
  render() {
    return (
      <MaterialTable
        title="Simple Action Preview"
        columns={this.state.columns}
        data={[
          { name: "Not Selected", surname: "Baran" },
          {
            Specification: "Mr",
            Info: "Baran"
          }
        ]}
      />
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<SimpleAction />, rootElement);
