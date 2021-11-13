import {
  ErrorViewContainer,
  FailureImage,
  RetryButton,
  FetchFailureText,
} from "./StyledComponents";

const ApiFailureView = (props) => {
  const { retryApiCall } = props;

  const onClickRetry = () => {
    retryApiCall();
  };

  return (
    <>
      <ErrorViewContainer>
        <FailureImage
          src="https://res.cloudinary.com/dsgniwzvz/image/upload/v1636800655/geekTrsut/transparent-blue-cassette-tape-message-board-with-earphone-turquoise-backdrop_tdsbrb.jpg"
          alt="data fetch failure"
        />
        <FetchFailureText>
          oops! something went wrong."Rewind" and{" "}
        </FetchFailureText>
        <RetryButton type="button" onClick={onClickRetry}>
          Retry
        </RetryButton>
      </ErrorViewContainer>
    </>
  );
};
export default ApiFailureView;
