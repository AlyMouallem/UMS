import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import TableC from "../forms/ClassesTable";
import Filter from "../forms/Filter";
// import Pagination from "../forms/Pagination";
// import { paginate } from "../../utils/paginate";
import _ from "lodash";

const IClasses = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));
  const [courses, setCourses] = useState([]);
  const [codes, setCodes] = useState([]);
  const [filter, setFilter] = useState([]);
  const router = useHistory();
  // const [pageSize, setPageSize] = useState(3);
  // const [currentPage, setCurrentPage] = useState(2);
  // const [sortColumn, setSortColumn] = useState({ path: "", order: "asc" });
  useEffect(() => {
    const getInstCourses = async () => {
      const { data } = await axios.get(
        `/api/courses/instructor/${state.user.name}`
      );
      setCourses(data);
      setFilter(data);
      setCodes(data.map(({ code }) => code));
    };
    getInstCourses();
  }, []);

  const showStudents = async (code) => {
    router.push(`/instructor-students/${code}`);
  };
  const handleClick = (item) => {
    if (item !== "All") {
      setFilter(courses.filter(({ code }) => code === item));
    } else {
      setFilter(courses);
    }
  };
  // const handleSort = (path) => {
  //   setSortColumn({ ...sortColumn, path });
  //   console.log(path);
  //   sortColumn.order === "asc"
  //     ? setSortColumn({ path, order: "desc" })
  //     : setSortColumn({ path, order: "asc" });
  // };
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const classes = paginate(courses, currentPage, pageSize);
  // const sorted = _.orderBy(classes, [sortColumn.path], [sortColumn.order]);
  // const result = paginate(sorted, currentPage, pageSize);
  return (
    <>
      {state && state.user && state.user.name && (
        <>
          {courses.length > 0 ? (
            <>
              <h1> Here is a list of your Classes</h1>

              <div className="row">
                <div className="col-md-2 col-sm-2 ">
                  <h4>Filter by code</h4>
                  <Filter items={codes} handleClick={handleClick} />
                </div>
                <div className="col-md-8 col-sm-8">
                  <TableC
                    courses={filter}
                    showStudents={showStudents}
                    // handleSort={handleSort}
                  />

                  {/* <Pagination
                      itemsCount={courses.length}
                      pageSize={pageSize}
                      pageChange={handlePageChange}
                      currentPage={currentPage}
                    /> */}
                </div>
              </div>
            </>
          ) : (
            <h1>You don't have any student</h1>
          )}
        </>
      )}
    </>
  );
};

export default IClasses;
