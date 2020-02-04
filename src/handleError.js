export default function handleError(
  errmsg
) {
  this.setState({
    ...this.state,
    error: errmsg,
    hasError: true
  });
}
