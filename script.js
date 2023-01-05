class WeatherApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: moment(),
      cities: {
        "à Tokyo": {
          timeZone: "Asia/Tokyo" },

        "au Mali": {
          timeZone: "Africa/Bamako" } } };



  }
  componentDidMount() {
    window.setInterval(() => this.setState({ currentTime: moment() }), 5000);
  }
  render() {
    const { cities, currentTime } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "panels" },
      Object.keys(cities).map((cityName) => /*#__PURE__*/
      React.createElement(City, {
        name: cityName,
        weatherId: cities[cityName].weatherId,
        timeZone: cities[cityName].timeZone,
        bgImg: cities[cityName].bgImg,
        currentTime: currentTime,
        key: cityName }))));




  }}


class City extends React.Component {
  constructor(props) {
    super(props);
    const { timeZone, currentTime } = this.props;
    this.state = {
      weatherData: {},
      localTime: currentTime.tz(timeZone).format("HH:mm"),
      currentHour: currentTime.tz(timeZone).format("HH"),
      open: false,
      bgGradient: "" };

    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  async getWeatherInfo(id) {
    const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=c5baa00af2bfbc51b5a8bff68a069bb0`).
    then(res => res.json());
    const weatherInfo = {
      temp: res.main.temp,
      desc: res.weather[0].main,
      icon: `icon-${res.weather[0].icon}` };

    this.setState({
      weatherData: weatherInfo });

  }
  setGradient(currentHour) {
    if (currentHour < 3) {
      this.setState({ bgGradient: "night-2" });
    } else if (currentHour < 6) {
      this.setState({ bgGradient: "dawn" });
    } else if (currentHour < 9) {
      this.setState({ bgGradient: "morning" });
    } else if (currentHour < 12) {
      this.setState({ bgGradient: "afternoon-1" });
    } else if (currentHour < 15) {
      this.setState({ bgGradient: "afternoon-2" });
    } else if (currentHour < 18) {
      this.setState({ bgGradient: "evening-1" });
    } else if (currentHour < 21) {
      this.setState({ bgGradient: "evening-2" });
    } else if (currentHour < 24) {
      this.setState({ bgGradient: "night-1" });
    }
  }
  updateCurrentTime() {
    const { timeZone, currentTime } = this.props;
    this.setState({ localTime: currentTime.tz(timeZone).format("dddd HH:mm") });
    this.setGradient(this.state.currentHour);
  }
  componentDidMount() {
    const { weatherId } = this.props;
    this.getWeatherInfo(weatherId);
    window.setInterval(() => this.updateCurrentTime(), 5000);
    this.setGradient(this.state.currentHour);
  }
  toggleOpen() {
    const currentState = this.state.open;
    this.setState({ open: !currentState });
  }
  render() {
    const { name, bgImg } = this.props;
    const { localTime } = this.state;
    const { desc, temp, icon } = this.state.weatherData;
    const activeClass = this.state.open ? "open" : "";
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, "Il est ",
      localTime, "  ", name)));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(WeatherApp, null), document.querySelector("#app"));