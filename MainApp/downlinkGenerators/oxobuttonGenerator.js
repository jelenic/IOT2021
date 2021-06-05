var lora_params = false
var lora_adr = true                 // ADR enable/disable
var lora_dr = 2                     // 0... 5
var lora_send_trials = 3            // 1... 10
var lora_join_trials = 1            // 1... 3
var lora_port = 1                   // 1... 223
var lora_cnf = true                 // confirmed messages enable/disable
var lora_heartbeat = 48             // 0... 65535‬
var lora_interval = 7               // 5... 65535‬

var periphery_params = false
var periphery_piezo_mode = 2        // 0 (Off), 1 (1 tone), 2 (2 tones), 3 (2*dur1), 4 (4*dur1), 5 (2*dur2), 6 (4*dur2), 7 (2*dur1 & 2*dur2), 8 (4*dur1 & 4*dur2)
var periphery_piezo_freq1 = 1       // 0... 3 -> f1: 0 (500Hz), 1 (1kHz), 2 (2kHz), 3 (4kHz)
var periphery_piezo_freq2 = 2       // 0... 3 -> f2: 0 (500Hz), 1 (1kHz), 2 (2kHz), 3 (4kHz)
var periphery_leds_enable = 0x0F    // LED EN bits: 0b0000'1111
var periphery_accel_mode = 0        // 0... 6
var periphery_show_hourglass = true

var image_params = false
var image_epd_mode = 1              // 0 = show all in the memory, 1 = show selected, 2 = toggle selected
var image_codes = [0x001D, 0x001E, 0x001F]

var user_text_params = true
var user_text_x_pos = 8             // 0... 199
var user_text_y_pos = 8             // 0... 199
var user_text_font_size = 24        // 8, 12, 16, 20, 24
var user_text_state = 0             // 0 (0°), 1 (0° inverted), 2 (90°), 3 (90° inverted), 4 (180°), 5 (180° inverted), 6 (270°), 7 (270° inverted)
var user_text_chars = "123\nABC"

var downlink_message = "";

if(lora_params){
    console.log("generating message for oxobutton");
    downlink_message += "B0"
    if (lora_adr){
        downlink_message += "01";
    }
    else{
        downlink_message += "00";
    }

    if (lora_dr < 0 || lora_dr > 5){
        console.log("invalid dr");
    }
    else{
        //donwlink_message += "0"
        
        downlink_message += pad_with_zeroes(2,lora_dr.toString(16));
    }

    if (lora_send_trials < 1 || lora_send_trials > 10){
        console.log("invalid send_trials");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,lora_send_trials.toString(16));
    }

    if (lora_join_trials < 1 || lora_join_trials > 3){
        console.log("invalid join_trials");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,lora_join_trials.toString(16));
    }

    if (lora_port < 1 || lora_port > 223){
        console.log("invalid port");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,lora_port.toString(16));
    }

    if (lora_cnf){
        downlink_message += "01";
    }
    else{
        downlink_message += "00";
    }

    if (lora_heartbeat < 1 || lora_heartbeat > 65535){
        console.log("invalid heartbeat");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(4,lora_heartbeat.toString(16));
    }

    if (lora_interval < 5 || lora_interval > 65535){
        console.log("invalid interval");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(4,lora_interval.toString(16));
    }
    console.log(downlink_message);
}

if (periphery_params){
    console.log("generating periphery message for oxobutton");
    downlink_message += "B1"
    if (periphery_piezo_mode < 0 || periphery_piezo_mode > 15){
        console.log("invalid interval");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(1,periphery_piezo_mode.toString(16));
    }

    if (periphery_piezo_freq1 < 0 || periphery_piezo_freq1 > 3 || periphery_piezo_freq2 < 0 || periphery_piezo_freq2 > 3){
        console.log("invalid interval");
    }
    else{
        periphery_piezo_freq = (periphery_piezo_freq2 << 2) | periphery_piezo_freq1
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(1,periphery_piezo_freq.toString(16));
    }
    downlink_message += "00"

    if (periphery_leds_enable < 0 || periphery_leds_enable > 0x0F){
        console.log("invalid interval");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,periphery_leds_enable.toString(16));
    }

    if (periphery_accel_mode < 0 || periphery_accel_mode > 6){
        console.log("invalid interval");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,periphery_accel_mode.toString(16));
    }

    if (periphery_show_hourglass){
        downlink_message += "01";
    }
    else{
        downlink_message += "00";
    }

    console.log(downlink_message);

}

if (image_params){
    console.log("generating periphery message for oxobutton");
    downlink_message += "B2";
    if (image_epd_mode < 0 || image_epd_mode > 2){
        console.log("invalid epd mode");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,image_epd_mode.toString(16));
    }

    if (image_epd_mode != 0){
        downlink_message += pad_with_zeroes(2,image_codes.length.toString(16));
        image_codes.forEach(function(item, index, array) {
            downlink_message += pad_with_zeroes(4,item.toString(16));
        })
    }
    console.log(downlink_message);

}

if (user_text_params){
    console.log("generating periphery message for oxobutton");
    downlink_message += "B3";
    if (user_text_x_pos < 0 || user_text_x_pos > 199){
        console.log("invalid x position");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,user_text_x_pos.toString(16));
    }

    if (user_text_y_pos < 0 || user_text_y_pos > 199){
        console.log("invalid y position");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,user_text_y_pos.toString(16));
    }

    if (user_text_font_size < 8 || user_text_font_size > 24){
        console.log("invalid font size");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,user_text_font_size.toString(16));
    }

    if (user_text_state < 0 || user_text_state > 7){
        console.log("invalid text state");
    }
    else{
        //donwlink_message += "0"
        downlink_message += pad_with_zeroes(2,user_text_state.toString(16));
    }
    downlink_message += pad_with_zeroes(2,user_text_chars.length.toString(16));

    for (var i = 0; i < user_text_chars.length; i++) {
        downlink_message += pad_with_zeroes(2,user_text_chars.charCodeAt(i).toString(16));
    }
    console.log(downlink_message);

}


function pad_with_zeroes(length, str) {

    var my_string = '' + str;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

module.exports = {
    ConfigureLoRaParameters: function(){
        var downlink_message = "";
        return downlink_message;
    },
    ConfigurePeripheryDownlinkMessageBytes: function(){
        var downlink_message = "";
        return downlink_message;
    },
    ConfigureImages: function(){
        var downlink_message = "";
        return downlink_message;
    },
    ConfigureText: function(){
        var downlink_message = "";
        return downlink_message;
    }
}