// WS-Log
// 
// Download to RED
function LogData () {
    readings = data_string.split(",")
    if (readings.length == 5) {
        temperature = parseFloat(readings[0])
        humidity = parseFloat(readings[1])
        pressure = parseFloat(readings[2])
        wind_speed = parseFloat(readings[3])
        wind_dir = readings[4]
        datalogger.log(
        datalogger.createCV("Temp", temperature),
        datalogger.createCV("Pressure", pressure),
        datalogger.createCV("Humidity", humidity),
        datalogger.createCV("WindSpeed", wind_speed),
        datalogger.createCV("WindDir", wind_dir),
        datalogger.createCV("Day", this_day),
        datalogger.createCV("Hour", this_hour),
        datalogger.createCV("Period", this_period)
        )
    } else {
        if (readings.length == 1) {
            rain = parseFloat(readings[0])
            datalogger.log(
            datalogger.createCV("Rain", convertToText(rain)),
            datalogger.createCV("Day", this_day),
            datalogger.createCV("Hour", this_hour)
            )
            if (this_period > periods_p_hour) {
                this_hour += 1
                this_period = 0
                if (this_hour == hours_p_day) {
                    this_hour = 0
                    this_period = 0
                    this_day += 1
                }
            }
        }
    }
}
radio.onReceivedString(function (receivedString) {
    data_string = receivedString
    LogData()
    this_period += 1
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // FieldTest 0420
    basic.showString("013")
})
let rain = 0
let wind_dir = ""
let wind_speed = 0
let pressure = 0
let humidity = 0
let temperature = 0
let data_string = ""
let readings: string[] = []
let hours_p_day = 0
let periods_p_hour = 0
let this_period = 0
let this_hour = 0
let this_day = 0
let debug = false
radio.setGroup(1)
radio.setFrequencyBand(0)
this_day = 0
this_hour = 0
this_period = 0
if (debug) {
    periods_p_hour = 3
    hours_p_day = 3
} else {
    periods_p_hour = 12
    hours_p_day = 24
}
// Test loop
loops.everyInterval(5000, function () {
    if (debug == true) {
        data_string = "72,1030,45,10,NW"
        LogData()
        this_period += 1
        if (this_period > periods_p_hour) {
            data_string = convertToText(randint(0, 10) * 0.11)
            LogData()
        }
    }
})
