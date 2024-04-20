"""

Build 010

Test 0420

"""
# WS-Log
# 
# Download to RED
def LogData():
    global readings, temperature, humidity, pressure, wind_speed, wind_dir, rain, periodnum, daynum
    readings = data_string.split(",")
    if len(readings) == 5:
        temperature = parse_float(readings[0])
        humidity = parse_float(readings[1])
        pressure = parse_float(readings[2])
        wind_speed = parse_float(readings[3])
        wind_dir = readings[4]
        datalogger.log(datalogger.create_cv("Temp", temperature),
            datalogger.create_cv("Pressure", pressure),
            datalogger.create_cv("Humidity", humidity),
            datalogger.create_cv("WindSpeed", wind_speed),
            datalogger.create_cv("WindDir", wind_dir),
            datalogger.create_cv("Day", daynum),
            datalogger.create_cv("Period", periodnum))
    else:
        if len(readings) == 1:
            rain = parse_float(readings[0])
            datalogger.log(datalogger.create_cv("Rain", convert_to_text(rain)),
                datalogger.create_cv("Day", convert_to_text(daynum)))
        periodnum = 0
        daynum += 1

def on_received_string(receivedString):
    global data_string, periodnum
    data_string = receivedString
    LogData()
    periodnum += 1
radio.on_received_string(on_received_string)

def on_logo_pressed():
    basic.show_string("010")
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

rain = 0
wind_dir = ""
wind_speed = 0
pressure = 0
humidity = 0
temperature = 0
data_string = ""
readings: List[str] = []
periods_p_day = 0
periodnum = 0
daynum = 0
debug = True
radio.set_group(1)
radio.set_frequency_band(0)
daynum = 0
periodnum = 0
if debug == True:
    periods_p_day = 3
else:
    periods_p_day = 288

def on_every_interval():
    global data_string, periodnum, daynum
    if debug == True:
        data_string = "72,1030,45,10,NW"
        LogData()
        periodnum += 1
        if periodnum > periods_p_day:
            data_string = convert_to_text(randint(0, 10) * 0.11)
            LogData()
            periodnum = 0
            daynum += 1
loops.every_interval(30000, on_every_interval)
