function installeClavier(callback) {
  $(document).on('keypress', function(e) {
    var keyNumberMap = {
      224:0, 48: 0,
      38: 1, 49: 1,
      233:2, 50: 2,
      34: 3, 51: 3,
      39: 4, 52: 4,
      40: 5, 53: 5,
      167:6, 54: 6,
      232:7, 55: 7,
      33: 8, 56: 8,
      231:9, 57: 9
    };

    if(e && e.charCode && e.charCode in keyNumberMap) {
      callback(keyNumberMap[e.charCode]);
    }
    e.preventDefault();
  });
}
