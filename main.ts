// WS-Log
// 
// Download to RED
function LogData () {
    basic.showString(data_string)
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
        datalogger.createCV("Day", daynum),
        datalogger.createCV("Period", periodnum)
        )
    } else {
        if (readings.length == 1) {
            rain = parseFloat(readings[0])
            datalogger.log(
            datalogger.createCV("Rain", convertToText(rain)),
            datalogger.createCV("Day", convertToText(daynum))
            )
        }
        periodnum = 0
        daynum += 1
    }
    basic.clearScreen()
}
radio.onReceivedString(function (receivedString) {
    data_string = receivedString
    LogData()
    periodnum += 1
})
let rain = 0
let wind_dir = ""
let wind_speed = 0
let pressure = 0
let humidity = 0
let temperature = 0
let readings: string[] = []
let data_string = ""
let periodnum = 0
let daynum = 0
let debug = false
radio.setGroup(1)
radio.setFrequencyBand(0)
daynum = 0
periodnum = 0
loops.everyInterval(30000, function () {
    if (debug == true) {
        data_string = "72,1030,45,10,NW"
        LogData()
        periodnum += 1
        if (periodnum > 1) {
            data_string = convertToText(randint(0, 10) * 0.11)
            LogData()
            periodnum = 0
            daynum += 1
        }
    }
})
