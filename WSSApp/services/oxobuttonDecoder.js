// http://oxobutton.ch/products/oxobutton-lorawan/documentation decoder for oxobutton


function oxobuttonStateUpdate(bytes) {
    var button = "0x" + ((bytes[1] < 16 ? "0" : "") + bytes[1].toString(16)).toUpperCase();
    var hbIRQ = !!bytes[2];
    var accIRQ = !!bytes[3];
    var imageId = bytes[4] * 256 + bytes[5];
    var bat = bytes[6];
    var temp = bytes[7];
    var accX = bytes[8] * 256 + bytes[9];
    var accY = bytes[10] * 256 + bytes[11];
    var accZ = bytes[12] * 256 + bytes[13];
    accX = accX < 32767 ? (2 / 8191) * accX : (-2 / 8192) * (65536 - accX);
    accY = accY < 32767 ? (2 / 8191) * accY : (-2 / 8192) * (65536 - accY);
    accZ = accZ < 32767 ? (2 / 8191) * accZ : (-2 / 8192) * (65536 - accZ);
    accX = Math.round((accX + 2.7755575615628914e-17) * 1000) / 1000;
    accY = Math.round((accY + 2.7755575615628914e-17) * 1000) / 1000;
    accZ = Math.round((accZ + 2.7755575615628914e-17) * 1000) / 1000;
    var decoded = {
      button: button,
      hbIRQ: hbIRQ,
      accIRQ: accIRQ,
      imageId: imageId,
      bat: bat,
      temp: temp,
      accX: accX,
      accY: accY,
      accZ: accZ,
    };
    return decoded;
  }


module.exports = {
    Decoder: function(bytes, port) {
        var decoded = {};
      
        switch (bytes[0]) {
          case 0x30:
            decoded = oxobuttonStateUpdate(bytes);
            break;
          default:
            break;
        }
      
        return decoded;
      },
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      }
      
      /* ID 0x30 */
      
}

