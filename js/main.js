function encode() {
   let message = document.getElementById('mes').value;
   let dig = message.split('');
   for (let i = 0; i < dig.length; i++) {
      dig[i] = Number(dig[i]);
   }
   let encoded = [];
   let p = [];
   p[0] = ((dig[0] + dig[1] + dig[2]) % 2 == 0) ? 0 : 1;
   p[1] = ((dig[0] + dig[2] + dig[3]) % 2 == 0) ? 0 : 1;
   p[2] = ((dig[0] + dig[1] + dig[3]) % 2 == 0) ? 0 : 1;
   let i = 0, j = 0;
   for (let i = 0, j = 0, k = 1; i < 4; k++) {
      if (Math.log2(k) == Math.floor(Math.log2(k))) {
         encoded.push(p[j]);
         j++;
      }
      else {
         encoded.push(dig[i]);
         i++;
      }
   }
   document.getElementById('enc').value = encoded.join('');
}


function diffDig(d) {
   if (d == 0) {
      return 1;
   }   
   return 0;
}


function decode() {
   let message = document.getElementById('enc').value;
   let mes = message.split('');
   let p = [];
   let dig = [];
   for (let i = 0; i < 7; i++) {
      if (i == 0 || i == 1 || i == 3) {
         p.push(Number(mes[i]));
      }
      else {
         dig.push(Number(mes[i]));
      }
   }
   console.log(p, dig);
   let mist = [0, 0, 0];

   if ((p[0] + dig[0] + dig[1] + dig[2]) % 2 != 0) {
      mist[0] = 1;
   } 
   if ((p[1] + dig[0] + dig[2] + dig[3]) % 2 != 0 ) {
      mist[1] = 1;
   } 
   if ((p[2] + dig[0] + dig[1] + dig[3]) % 2 != 0) {
      mist[2] = 1;
   }
   
   let err;

   if (mist[0] == 1 && mist[1] == 1 && mist[2] == 1) {
      dig[0] = diffDig(dig[0]);
      err = " Error: 1 char";
   } else if (mist[0] == 0 && mist[1] == 1 && mist[2] == 1) {
      dig[3] = diffDig(dig[3]);
      err = " Error: 4 char";
   } else if (mist[0] == 1 && mist[1] == 0 && mist[2] == 1) {
      dig[1] = diffDig(dig[1]);
      err = " Error: 2 char";
   } else if (mist[0] == 1 && mist[1] == 1 && mist[2] == 0) {
      dig[2] = diffDig(dig[2]);
      err = " Error: 3 char";
   }
   let decoded = dig;
   document.getElementById('err').value =  err ?? " No error";
   document.getElementById('dec').value = decoded.join('');
}