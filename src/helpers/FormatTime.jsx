const FormatTime = (countdown) => {
  let hours, minutes, seconds;
  if (countdown >= 0) {
    hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((countdown % (1000 * 60)) / 1000);
  } else {
    hours = Math.ceil((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.ceil((countdown % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.ceil((countdown % (1000 * 60)) / 1000);
  }

  return [hours, minutes, seconds];
};
export default FormatTime;
