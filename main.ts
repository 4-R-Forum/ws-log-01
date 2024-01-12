function LogData () {
    basic.showString(data_string)
    readings = data_string.split(",")
    if (readings.length == 5) {
        got5 = true
        temperature = parseFloat(readings[0])
        humidity = parseFloat(readings[1])
        pressure = parseFloat(readings[2])
        wind_speed = parseFloat(readings[3])
        wind_dir = readings[4]
    } else {
        if (readings.length == 1) {
            got1 = true
            rain = parseFloat(readings[0])
        }
    }
    if (got5 == true && got1 == true) {
        datalogger.log(
        datalogger.createCV("Temp", temperature),
        datalogger.createCV("Pressure", pressure),
        datalogger.createCV("Humidity", humidity),
        datalogger.createCV("WindSpeed", wind_speed),
        datalogger.createCV("WindDir", wind_dir),
        datalogger.createCV("Rain", rain)
        )
        got1 = false
        got5 = false
    }
    basic.clearScreen()
}
radio.onReceivedString(function (receivedString) {
    data_string = receivedString
    LogData()
})
/**
 * WS-Log
 * 
 * Download to RED
 */
let rain = 0
let wind_dir = ""
let wind_speed = 0
let pressure = 0
let humidity = 0
let temperature = 0
let readings: string[] = []
let data_string = ""
let got1 = false
let got5 = false
radio.setGroup(1)
radio.setFrequencyBand(0)
got5 = false
got1 = false
let debug = false
loops.everyInterval(60000, function () {
    if (debug == true) {
        data_string = "72,1030,45,10,NW"
        LogData()
        data_string = "1"
        LogData()
    }
})
