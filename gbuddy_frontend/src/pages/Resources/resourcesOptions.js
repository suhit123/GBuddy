import Nav from "../../components/Nav";
import "../../css/resources/resourceOptions.css";
import "../../css/resources/select.css";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResourceOptions = () => {
    const navigator=useNavigate();
  const [selected, setSelected] = useState({
    branch: "",
    year: "",
    subject: "",
    unit: "",
  });
  const [branchList, setBranchList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  useEffect(() => {
    const branchListFetcher = async () => {
      await axios
        .get("http://localhost:8080/fetch/fetchBranchList")
        .then((res) => {
          setBranchList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    branchListFetcher();
  }, []);

  useEffect(() => {
    if (selected.year !== "" && selected.branch !== "") {
      const subjectListFetcher = async () => {
        await axios
          .get(
            `http://localhost:8080/fetch/fetchSubjectByYear?year=${selected.year}&branch=${selected.branch}`
          )
          .then((res) => {
            setSubjectList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      subjectListFetcher();
    }
  }, [selected]);
  useEffect(() => {
    console.log(selected);
  }, [selected]); // Ensure useEffect runs whenever `selected` changes

  const handleChange = (field) => (event) => {
    setSelected({ ...selected, [field]: event.target.value });
  };

  return (
    <>
      <Nav />
      <div className="resourceOptionsContainer">
        <div className="resourceOptionsContainerLeft">
          <img
            src={require("../../images/1_q59sdgADthBOEDhjkQBr4A.gif")}
            alt="img"
          />
          <h3>
            Lost Searching resources and PDF's ?{" "}
            <span style={{ color: "black", fontWeight: 400 }}>
              We are here to help you
            </span>
          </h3>
        </div>
        <div className="resourceOptionsContainerRight">
          <div className="resourceOptionsContainerRightTop">
            <div className="optionSelectors">
              <FormControl fullWidth>
                <InputLabel style={{ fontSize: 14 }} id="branch-select-label">
                  Branch
                </InputLabel>
                <Select
                  style={{ fontSize: 14 }}
                  labelId="branch-select-label"
                  id="branch-select"
                  value={selected.branch}
                  label="Branch"
                  onChange={handleChange("branch")}
                >
                  {branchList.map((branch) => {
                    return (
                      <MenuItem style={{ fontSize: 14 }} value={branch}>
                        {branch}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="optionSelectors">
              <FormControl fullWidth disabled={selected.branch === ""}>
                <InputLabel style={{ fontSize: 14 }} id="year-select-label">
                  Year
                </InputLabel>
                <Select
                  style={{ fontSize: 14 }}
                  labelId="year-select-label"
                  id="year-select"
                  value={selected.year}
                  label="Year"
                  onChange={handleChange("year")}
                >
                  <MenuItem style={{ fontSize: 14 }} value={1}>
                    First
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={2}>
                    Second
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={3}>
                    Third
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={4}>
                    Fourth
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="optionSelectors">
              <FormControl
                fullWidth
                disabled={selected.branch === "" || selected.year === ""}
              >
                <InputLabel style={{ fontSize: 14 }} id="subject-select-label">
                  Subject
                </InputLabel>
                <Select
                  style={{ fontSize: 14 }}
                  labelId="subject-select-label"
                  id="subject-select"
                  value={selected.subject}
                  label="Subject"
                  onChange={handleChange("subject")}
                >
                  {subjectList.map((subject) => {
                    return (
                      <MenuItem style={{ fontSize: 14 }} value={subject}>
                        {subject}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="optionSelectors">
              <FormControl
                fullWidth
                disabled={
                  selected.branch === "" ||
                  selected.year === "" ||
                  selected.subject === ""
                }
              >
                <InputLabel style={{ fontSize: 14 }} id="unit-select-label">
                  Unit
                </InputLabel>
                <Select
                  style={{ fontSize: 14 }}
                  labelId="unit-select-label"
                  id="unit-select"
                  value={selected.unit}
                  label="Unit"
                  onChange={handleChange("unit")}
                >
                  <MenuItem style={{ fontSize: 14 }} value={1}>
                    First Unit
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={2}>
                    Second Unit
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={3}>
                    Third Unit
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={4}>
                    Fourth Unit
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={5}>
                    Fifth Unit
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="resourceOptionsContainerRightBottom">
            <FormControl fullWidth>
              <Button style={{ backgroundColor: "black" }} variant="contained" onClick={()=>{
                navigator(`/library?branch=${selected.branch}&year=${selected.year}&subject=${selected.subject}&unit=${selected.unit}`)
              }}>
                View
              </Button>
            </FormControl>
            <FormControl fullWidth>
              <Button style={{ backgroundColor: "white",color:'black',marginTop:"10px" }} variant="contained" onClick={()=>{
                navigator('/resourceContribute')
              }}>
                Contribute
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceOptions;
