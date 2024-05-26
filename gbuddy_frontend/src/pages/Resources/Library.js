import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import "../../css/resources/notes.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FolderIcon from "@mui/icons-material/Folder";
import DownloadIcon from "@mui/icons-material/Download";
import PDFViewer from "./components/PDFViewer.js";
import Nav from "../../components/Nav.js";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const Library = () => {
  const [view, setView] = useState("flat");
  const location = new URLSearchParams(useLocation().search);
  const [selected, setSelected] = useState({
    branch: "",
    year: "",
    subject: "",
    unit: "",
    youtubeUrl: "",
  });
  const queryParams = {};
  for (let param of location.entries()) {
    queryParams[param[0]] = param[1];
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    if (
      queryParams.branch === undefined ||
      queryParams.year === undefined ||
      queryParams.subject === undefined ||
      queryParams.unit === undefined
    )
      return;
    axios
      .get(
        `http://localhost:8080/fetch/fetchNotes?branch=${queryParams.branch}&year=${queryParams.year}&subject=${queryParams.subject}&unit=${queryParams.unit}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className="libraryContainer">
        <div className="notesContainer">
          <h1>Documents & Resources</h1>
          <div className="switchNotesView">
            <div
              onClick={() => {
                setView("flat");
              }}
            >
              <MenuIcon />
            </div>
            <div
              onClick={() => {
                setView("grid");
              }}
            >
              <GridViewIcon />
            </div>
          </div>
          {view === "flat" ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Format</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((note) => (
                    <TableRowComponent note={note} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="notesBlocksGrid">
              {data.map((note) => (
                <NotesBlock note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
      <h3 style={{fontSize:"24px",textAlign:'center',marginTop:"50px",paddingBottom:"10px"}}>Tutorials you can follow ...</h3>
      <div className="suggestionsLibrary">
        <iframe
          className="suggestionsLibraryContribute"
          width="400"
          height="200"
          src="https://www.youtube.com/embed/videoseries?si=UToZ3AzZ35uWD_EU&amp;list=PLjVLYmrlmjGe-xLyoCdDrt8Nil1Alg_L3"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          className="suggestionsLibraryContribute"
          width="400"
          height="200"
          src="https://www.youtube.com/embed/1vsmaEfbnoE?si=1DiGJrE8aj5nQ5G5"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          className="suggestionsLibraryContribute"
          width="400"
          height="200"
          src="https://www.youtube.com/embed/i_LwzRVP7bg?si=8b8YUSuP20-qYvIp"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          className="suggestionsLibraryContribute"
          width="400"
          height="200"
          src="https://www.youtube.com/embed/AMxtGWcMYd4?si=8glC8lcBR6QzUPbu"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <h3 style={{fontSize:"24px",textAlign:'center',marginTop:"20px"}}>Contribute</h3>
      <div className="suggestionsLibraryContributeNow">
        <div className="suggestionsLibraryContributeNowLeft">
          <img
            src="https://www.shutterstock.com/image-vector/brainstorm-teamwork-concept-business-team-600nw-2196144523.jpg"
            alt="img"
          />
        </div>
        <div className="suggestionsLibraryContributeNowRight">
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
            <div className="optionSelectors" style={{ marginBottom: "10px" }}>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  id="outlined-basic"
                  value={selected.youtubeUrl}
                  label="Youtube PlayList or Video URL"
                  variant="outlined"
                  onChange={handleChange("youtubeUrl")}
                />
              </FormControl>
            </div>
            <div className="resourceOptionsContainerRightBottom">
              <FormControl fullWidth>
                <Button
                  style={{ backgroundColor: "black", padding: "10px" }}
                  variant="contained"
                  onClick={() => {
                    navigator(
                      `/library?branch=${selected.branch}&year=${selected.year}&subject=${selected.subject}&unit=${selected.unit}`
                    );
                  }}
                >
                  View
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const TableRowComponent = ({ note }) => {
  const [visible, setVisible] = useState(false);
  return (
    <TableRow key={note?.id}>
      <TableCell component="th" scope="row">
        <div
          className="notesBlockTitle"
          onMouseEnter={() => {
            setVisible(true);
          }}
          onMouseLeave={() => {
            setVisible(false);
          }}
        >
          {visible && (
            <div
              className="hoverDivList"
              onMouseEnter={() => {
                setVisible(true);
              }}
              onMouseLeave={() => {
                setVisible(false);
              }}
            >
              <PDFViewer pdfUrl={note?.documentUrl} />
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill-rule="evenodd"
            clip-rule="evenodd"
            image-rendering="optimizeQuality"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            viewBox="0 0 17639 17639"
            id="powerpoint"
          >
            <path
              fill="#d04525"
              d="m3457 4868 6169-1132v10167l-6171-916 2-8119zm6421 2152 5-636 3452 1v5539H9878l2-565h2397v-493H9878v-424h2399v-458H9878v-460c1526 249 1821-792 1799-1269h-1341V6950c-158 19-334 30-458 70zm0-1307 4235 2-2 5045h-388V6068H9878v-355zm-7797 9880h13478l-2-13476H2081v13476z"
            ></path>
            <path
              fill="#d04525"
              d="M6303 7731c490-47 729 32 706 552-20 445-268 528-713 503l7-1055zm-593-592-13 3427 579 37 18-1189c481-45 852-53 1100-326 228-251 341-698 287-1145-134-1091-1003-822-1971-804zm4838 904h1305c0-740-388-1270-1303-1270l-2 1270z"
            ></path>
            <path
              fill="none"
              d="M6296 8786c445 25 693-58 713-503 23-520-216-599-706-552l-7 1055z"
            ></path>
          </svg>
          <p>{note?.title}</p>
        </div>
      </TableCell>
      <TableCell align="center">{note?.format}</TableCell>
      <TableCell align="center">{note?.date.split("T")[0]}</TableCell>
      <TableCell
        align="center"
        onClick={() => {
          window.open(`https://drive.google.com/uc?id=${note?.documentUrl}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <span style={{ color: "grey" }}>
          <DownloadIcon />
        </span>{" "}
        Download
      </TableCell>
    </TableRow>
  );
};
const NotesBlock = ({ note }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="notesBlockGrid" key={note?.id}>
      <div
        className="notesBlockTitleGrid"
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill-rule="evenodd"
          clip-rule="evenodd"
          image-rendering="optimizeQuality"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          viewBox="0 0 17639 17639"
          id="powerpoint"
        >
          <path
            fill="#d04525"
            d="m3457 4868 6169-1132v10167l-6171-916 2-8119zm6421 2152 5-636 3452 1v5539H9878l2-565h2397v-493H9878v-424h2399v-458H9878v-460c1526 249 1821-792 1799-1269h-1341V6950c-158 19-334 30-458 70zm0-1307 4235 2-2 5045h-388V6068H9878v-355zm-7797 9880h13478l-2-13476H2081v13476z"
          ></path>
          <path
            fill="#d04525"
            d="M6303 7731c490-47 729 32 706 552-20 445-268 528-713 503l7-1055zm-593-592-13 3427 579 37 18-1189c481-45 852-53 1100-326 228-251 341-698 287-1145-134-1091-1003-822-1971-804zm4838 904h1305c0-740-388-1270-1303-1270l-2 1270z"
          ></path>
          <path
            fill="none"
            d="M6296 8786c445 25 693-58 713-503 23-520-216-599-706-552l-7 1055z"
          ></path>
        </svg>
        <p>{note?.title}</p>
      </div>
      <div className="notesBlockContentGrid">
        <div className="notesBlockContentGridTop">
          <p>Updated</p>
          <p>{note?.date.split("T")[0]}</p>
        </div>
        <div className="notesBlockContentGridBottom">
          <span
            onClick={() => {
              console.log(note?.documentUrl);
              window.open(
                `https://drive.google.com/uc?id=${note?.documentUrl}`
              );
            }}
            style={{ cursor: "pointer" }}
          >
            <DownloadIcon />
            Download
          </span>
        </div>
      </div>
      {visible && (
        <div
          className="hoverDiv"
          onMouseEnter={() => {
            setVisible(true);
          }}
          onMouseLeave={() => {
            setVisible(false);
          }}
        >
          <PDFViewer pdfUrl={note?.documentUrl} />
        </div>
      )}
    </div>
  );
};
export default Library;
