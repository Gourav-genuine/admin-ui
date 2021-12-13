import React, { Component } from "react";
import "./App.css";
import AdminTable from "./AdminTable";
import PaginationBar from "./PaginationBar";
import SearchBar from "./SearchBar";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: "",
      data: [],
      pageNum: 1,
      totalPages: 0,
      selectedRows: [],
      initial: 0,
      allChecked: false,
      baseUrl:
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    };
  }

  getData() {
    fetch(this.state.baseUrl)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({ data: resJson });
        this.setState({ totalPages: Math.ceil(resJson.length / 10) });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getData();
  }
  // const baseUrl =
  //   "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  render() {
    const {
      searchData,
      data,
      allChecked,
      pageNum,
      totalPages,
      selectedRows,
      initial,
      baseUrl,
    } = this.state;

    const setPageNum = (pageNum) => {
      this.setState({ initial: (pageNum - 1) * 10 });
      this.setState({ pageNum: pageNum });
    };

    const selectAllRowsInPage = () => {
      if (!allChecked) {
        const rows = [];

        data.map((row, index) => {
          if (index >= (pageNum - 1) * 10 && index < pageNum * 10) {
            rows.push(row.id);
          }
        });
        console.log(rows);
        this.setState({ selectedRows: rows });
      } else {
        this.setState({ selectedRows: [] });
      }
    };

    const deleteLocalData = (id) => {
      const newData = data.filter((item) => item.id !== id);
      this.setState({ data: newData });
      let totalPages = Math.ceil(newData.length / 10);
      this.setState({ totalPages: totalPages });
    };

    const deleteSelectedData = () => {
      const newData = data.filter((item) => !selectedRows.includes(item.id));
      this.setState({ data: newData });
      let totalPages = Math.ceil(newData.length / 10);
      this.setState({ totalPages: totalPages });
    };

    const nextPage = () => {
      if (pageNum < totalPages) {
        this.setState({ initial: initial + 10 });
        this.setState({ pageNum: pageNum + 1 });
        console.log("pageNum", pageNum);
      }
    };
    const prevPage = () => {
      if (pageNum > 1) {
        this.setState({ initial: initial - 10 });
        this.setState({ pageNum: pageNum - 1 });
        console.log("pageNum", pageNum);
      }
    };

    const editSelectedData = (user) => {
      const newData = data.map((item) => {
        if (item.id === user.id) {
          item = user;
        }
        return item;
      });
      this.setState({ data: newData });
    };

    const pushToSelectedRow = (row) => {
      if (selectedRows.includes(row)) {
        selectedRows.splice(selectedRows.indexOf(row), 1);
      } else {
        selectedRows.push(row);
      }
      this.setState({ selectedRows: selectedRows });
    };

    const setSearchData = (search) => {
      this.setState({ searchData: search });
    };

    const setAllChecked = (status) => {
      if (status != null) {
        this.setState({ allChecked: status });
      } else {
        this.setState({ allChecked: !allChecked });
      }
    };

    return (
      <>
        <div className="app-container">
          <SearchBar setSearchData={setSearchData} />
          <AdminTable
            selectedRows={selectedRows}
            data={data}
            searchData={searchData}
            initial={initial}
            prevPage={prevPage}
            nextPage={nextPage}
            handleRowSelect={pushToSelectedRow}
            deleteLocalData={deleteLocalData}
            editSelectedData={editSelectedData}
            selectAllRowsInPage={selectAllRowsInPage}
            setAllChecked={setAllChecked}
            allChecked={allChecked}
            // showEditDialogue={showEditDialogue}
          />

          <PaginationBar
            prevPage={prevPage}
            nextPage={nextPage}
            deleteSelectedData={deleteSelectedData}
            pageNum={pageNum}
            setAllChecked={setAllChecked}
            totalPages={totalPages}
            setPageNum={setPageNum}
          />
        </div>
      </>
    );
  }
}

export default App;
