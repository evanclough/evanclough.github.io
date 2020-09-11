const w = 800;
const h = 500;

var distance = function(xi, yi, xf, yf) {
    return Math.sqrt(Math.pow(xf - xi, 2) + Math.pow(yf - yi, 2))
  }
  var angleMaker = function(xi, yi, xf, yf) {
    
    if(yf - yi === 0){
      if(xf - xi > 0){
         return 0 
      }else {
       return PI 
      }
    }else {
    if ((yf - yi) / (xf - xf) < 0 && xf - xi < 0) {
      return Math.atan((yf - yi) / (xf - xi)) + 3.14
    } else if ((yf - yi) / (xf - xf) < 0 && xf - xi >= 0) {
      return Math.atan((yf - yi) / (xf - xi)) + 6.28
    } else if ((yf - yi) / (xf - xf) >= 0 && xf - xi < 0) {
      return Math.atan((yf - yi) / (xf - xi)) + 3.14
    } else if ((yf - yi) / (xf - xf) >= 0 && xf - xi >= 0) {
      return Math.atan((yf - yi) / (xf - xi))
    }
    }
  }
  
  const sclX = function(n){
      return n * w / 800;
  }
  
  const sclY = function(n){
     return n * h / 500; 
  }