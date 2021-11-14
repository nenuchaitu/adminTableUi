import { Component } from "react";
import Loader from "react-loader-spinner";
import ApiFailureView from "../ApiFailureView";
import ApiSuccessView from "../ApiSuccessView";
import {
  LoadingViewContainer,
  AppContainer,
  AdminTableHeading,
} from "./StyledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Adminui extends Component {
  state = {
    usersList: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    const dataFetched = await fetch(apiUrl);
    if (dataFetched.ok) {
      const dataResolved = await dataFetched.json();
      const updatedList = dataResolved.map((eachUser) => ({
        ...eachUser,
        isChecked: false,
      }));
      this.setState({
        usersList: updatedList,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderLoadingView = () => (
    <LoadingViewContainer>
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </LoadingViewContainer>
  );

  retryApiCall = () => {
    this.getData();
  };

  renderAdminuiFailureView = () => (
    <ApiFailureView retryApiCall={this.retryApiCall} />
  );

  renderAdminuiSuccessView = () => {
    const { usersList } = this.state;
    return <ApiSuccessView usersList={usersList} />;
  };

  renderAdminuiView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAdminuiSuccessView();
      case apiStatusConstants.failure:
        return this.renderAdminuiFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <AppContainer>
        <AdminTableHeading>Users List</AdminTableHeading>
        {this.renderAdminuiView()}
      </AppContainer>
    );
  }
}
export default Adminui;
