'use strict';

!function () {

  // alignment pattern
  var adelta = [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];

  // version block
  var vpat = [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69];

  // final format bits with mask: level << 3 | mask
  var fmtword = [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, //L
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, //M
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, //Q
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b //H
  ];

  // 4 per version: number of blocks 1,2; data width; ecc width
  var eccblocks = [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];

  // Galois field log table
  var glog = [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];

  // Galios field exponent table
  var gexp = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];

  // Working buffers:
  // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
  var strinbuf = [],
      eccbuf = [],
      qrframe = [],
      framask = [],
      rlens = [];
  // Control values - width is based on version, last 4 are from table.
  var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
  var ecclevel = 2;
  // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
  function setmask(x, y) {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    // y*y = 1+3+5...
    bt = y;
    bt *= y;
    bt += y;
    bt >>= 1;
    bt += x;
    framask[bt] = 1;
  }

  // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
  function putalign(x, y) {
    var j;

    qrframe[x + width * y] = 1;
    for (j = -2; j < 2; j++) {
      qrframe[x + j + width * (y - 2)] = 1;
      qrframe[x - 2 + width * (y + j + 1)] = 1;
      qrframe[x + 2 + width * (y + j)] = 1;
      qrframe[x + j + 1 + width * (y + 2)] = 1;
    }
    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j);
      setmask(x + 1, y - j);
      setmask(x - j, y - 1);
      setmask(x + j, y + 1);
    }
  }

  //========================================================================
  // Reed Solomon error correction
  // exponentiation mod N
  function modnn(x) {
    while (x >= 255) {
      x -= 255;
      x = (x >> 8) + (x & 255);
    }
    return x;
  }

  var genpoly = [];

  // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
  function appendrs(data, dlen, ecbuf, eclen) {
    var i, j, fb;

    for (i = 0; i < eclen; i++) {
      strinbuf[ecbuf + i] = 0;
    }for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
      if (fb != 255) /* fb term is non-zero */
        for (j = 1; j < eclen; j++) {
          strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];
        } else for (j = ecbuf; j < ecbuf + eclen; j++) {
        strinbuf[j] = strinbuf[j + 1];
      }strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
    }
  }

  //========================================================================
  // Frame data insert following the path rules

  // check mask - since symmetrical use half.
  function ismasked(x, y) {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    bt = y;
    bt += y * y;
    bt >>= 1;
    bt += x;
    return framask[bt];
  }

  //========================================================================
  //  Apply the selected mask out of the 8.
  function applymask(m) {
    var x, y, r3x, r3y;

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(x + y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0;
              r3y = !r3y;
            }
            if (!r3y && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }break;
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }
        break;
    }
    return;
  }

  // Badness coefficients.
  var N1 = 3,
      N2 = 3,
      N3 = 40,
      N4 = 10;

  // Using the table of the length of each run, calculate the amount of bad image
  // - long runs or those that look like finders; called twice, once each for X and Y
  function badruns(length) {
    var i;
    var runsbad = 0;
    for (i = 0; i <= length; i++) {
      if (rlens[i] >= 5) runsbad += N1 + rlens[i] - 5;
    } // BwBBBwB as in finder
    for (i = 3; i < length - 1; i += 2) {
      if (rlens[i - 2] == rlens[i + 2] && rlens[i + 2] == rlens[i - 1] && rlens[i - 1] == rlens[i + 1] && rlens[i - 1] * 3 == rlens[i]
      // white around the black pattern? Not part of spec
      && (rlens[i - 3] == 0 // beginning
      || i + 3 > length // end
      || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4)) runsbad += N3;
    }return runsbad;
  }

  // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
  function badcheck() {
    var x, y, h, b, b1;
    var thisbad = 0;
    var bw = 0;

    // blocks of same color.
    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if (qrframe[x + width * y] && qrframe[x + 1 + width * y] && qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
        !(qrframe[x + width * y] || qrframe[x + 1 + width * y] || qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
          thisbad += N2;
      }
    } // X runs
    for (y = 0; y < width; y++) {
      rlens[0] = 0;
      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
        b = b1;
        bw += b ? 1 : -1;
      }
      thisbad += badruns(h);
    }

    // black/white imbalance
    if (bw < 0) bw = -bw;

    var big = bw;
    var count = 0;
    big += big << 2;
    big <<= 1;
    while (big > width * width) {
      big -= width * width, count++;
    }thisbad += count * N4;

    // Y runs
    for (x = 0; x < width; x++) {
      rlens[0] = 0;
      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else rlens[++h] = 1;
        b = b1;
      }
      thisbad += badruns(h);
    }
    return thisbad;
  }

  function genframe(instring) {
    var x, y, k, t, v, i, j, m;

    // find the smallest version that fits the string
    t = instring.length;
    version = 0;
    do {
      version++;
      k = (ecclevel - 1) * 4 + (version - 1) * 16;
      neccblk1 = eccblocks[k++];
      neccblk2 = eccblocks[k++];
      datablkw = eccblocks[k++];
      eccblkwid = eccblocks[k];
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
      if (t <= k) break;
    } while (version < 40);

    // FIXME - insure that it fits insted of being truncated
    width = 17 + 4 * version;

    // allocate, clear and setup data structures
    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (t = 0; t < v; t++) {
      eccbuf[t] = 0;
    }strinbuf = instring.slice(0);

    for (t = 0; t < width * width; t++) {
      qrframe[t] = 0;
    }for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
      framask[t] = 0;
    } // insert finders - black to frame, white to mask
    for (t = 0; t < 3; t++) {
      k = 0;
      y = 0;
      if (t == 1) k = width - 7;
      if (t == 2) y = width - 7;
      qrframe[y + 3 + width * (k + 3)] = 1;
      for (x = 0; x < 6; x++) {
        qrframe[y + x + width * k] = 1;
        qrframe[y + width * (k + x + 1)] = 1;
        qrframe[y + 6 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 6)] = 1;
      }
      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1);
        setmask(y + 1, k + x + 1);
        setmask(y + 5, k + x);
        setmask(y + x + 1, k + 5);
      }
      for (x = 2; x < 4; x++) {
        qrframe[y + x + width * (k + 2)] = 1;
        qrframe[y + 2 + width * (k + x + 1)] = 1;
        qrframe[y + 4 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 4)] = 1;
      }
    }

    // alignment blocks
    if (version > 1) {
      t = adelta[version];
      y = width - 7;
      for (;;) {
        x = width - 7;
        while (x > t - 3) {
          putalign(x, y);
          if (x < t) break;
          x -= t;
        }
        if (y <= t + 9) break;
        y -= t;
        putalign(6, y);
        putalign(y, 6);
      }
    }

    // single black
    qrframe[8 + width * (width - 8)] = 1;

    // timing gap - mask only
    for (y = 0; y < 7; y++) {
      setmask(7, y);
      setmask(width - 8, y);
      setmask(7, y + width - 7);
    }
    for (x = 0; x < 8; x++) {
      setmask(x, 7);
      setmask(x + width - 8, 7);
      setmask(x, width - 8);
    }

    // reserve mask-format area
    for (x = 0; x < 9; x++) {
      setmask(x, 8);
    }for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8);
      setmask(8, x);
    }
    for (y = 0; y < 7; y++) {
      setmask(8, y + width - 7);
    } // timing row/col
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6);
        setmask(6, 8 + x);
      } else {
        qrframe[8 + x + width * 6] = 1;
        qrframe[6 + width * (8 + x)] = 1;
      }
    } // version block
    if (version > 6) {
      t = vpat[version - 7];
      k = 17;
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            qrframe[5 - x + width * (2 - y + width - 11)] = 1;
            qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
          } else {
            setmask(5 - x, 2 - y + width - 11);
            setmask(2 - y + width - 11, 5 - x);
          }
        }
      }
    }

    // sync mask bits - only set above for white spaces, so add in black bits
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (qrframe[x + width * y]) setmask(x, y);
      }
    } // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
    v = strinbuf.length;

    // string to array
    for (i = 0; i < v; i++) {
      eccbuf[i] = strinbuf.charCodeAt(i);
    }strinbuf = eccbuf.slice(0);

    // calculate max string length
    x = datablkw * (neccblk1 + neccblk2) + neccblk2;
    if (v >= x - 2) {
      v = x - 2;
      if (version > 9) v--;
    }

    // shift and repack to insert length prefix
    i = v;
    if (version > 9) {
      strinbuf[i + 2] = 0;
      strinbuf[i + 3] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 3] |= 255 & t << 4;
        strinbuf[i + 2] = t >> 4;
      }
      strinbuf[2] |= 255 & v << 4;
      strinbuf[1] = v >> 4;
      strinbuf[0] = 0x40 | v >> 12;
    } else {
      strinbuf[i + 1] = 0;
      strinbuf[i + 2] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 2] |= 255 & t << 4;
        strinbuf[i + 1] = t >> 4;
      }
      strinbuf[1] |= 255 & v << 4;
      strinbuf[0] = 0x40 | v >> 4;
    }
    // fill to end with pad pattern
    i = v + 3 - (version < 10);
    while (i < x) {
      strinbuf[i++] = 0xec;
      // buffer has room    if (i == x)      break;
      strinbuf[i++] = 0x11;
    }

    // calculate and append ECC

    // calculate generator polynomial
    genpoly[0] = 1;
    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1;
      for (j = i; j > 0; j--) {
        genpoly[j] = genpoly[j] ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];
      }genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
    }
    for (i = 0; i <= eccblkwid; i++) {
      genpoly[i] = glog[genpoly[i]];
    } // use logs for genpoly[] to save calc step

    // append ecc to data buffer
    k = x;
    y = 0;
    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid);
      y += datablkw;
      k += eccblkwid;
    }
    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid);
      y += datablkw + 1;
      k += eccblkwid;
    }
    // interleave blocks
    y = 0;
    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) {
        eccbuf[y++] = strinbuf[i + j * datablkw];
      }for (j = 0; j < neccblk2; j++) {
        eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
      }
    }
    for (j = 0; j < neccblk2; j++) {
      eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
    }for (i = 0; i < eccblkwid; i++) {
      for (j = 0; j < neccblk1 + neccblk2; j++) {
        eccbuf[y++] = strinbuf[x + i + j * eccblkwid];
      }
    }strinbuf = eccbuf;

    // pack bits into frame avoiding masked area.
    x = y = width - 1;
    k = v = 1; // up, minus
    /* inteleaved data and ecc codes */
    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (i = 0; i < m; i++) {
      t = strinbuf[i];
      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t) qrframe[x + width * y] = 1;
        do {
          // find next fill position
          if (v) x--;else {
            x++;
            if (k) {
              if (y != 0) y--;else {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y = 9;
                }
              }
            } else {
              if (y != width - 1) y++;else {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (ismasked(x, y));
      }
    }

    // save pre-mask copy of frame
    strinbuf = qrframe.slice(0);
    t = 0; // best
    y = 30000; // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.
    for (k = 0; k < 8; k++) {
      applymask(k); // returns black-white imbalance
      x = badcheck();
      if (x < y) {
        // current mask better than previous best?
        y = x;
        t = k;
      }
      if (t == 7) break; // don't increment i to a void redoing mask
      qrframe = strinbuf.slice(0); // reset for next pass
    }
    if (t != k) // redo best mask - none good enough, last wasn't t
      applymask(t);

    // add in final mask/ecclevel bytes
    y = fmtword[t + (ecclevel - 1 << 3)];
    // low byte
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[width - 1 - k + width * 8] = 1;
        if (k < 6) qrframe[8 + width * k] = 1;else qrframe[8 + width * (k + 1)] = 1;
      }
    } // high byte
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1;
        if (k) qrframe[6 - k + width * 8] = 1;else qrframe[7 + width * 8] = 1;
      }
    }return qrframe;
  }

  var _canvas = null;

  var api = {

    get ecclevel() {
      return ecclevel;
    },

    set ecclevel(val) {
      ecclevel = val;
    },

    get size() {
      return _size;
    },

    set size(val) {
      _size = val;
    },

    get canvas() {
      return _canvas;
    },

    set canvas(el) {
      _canvas = el;
    },

    getFrame: function getFrame(string) {
      return genframe(string);
    },
    //这里的utf16to8(str)是对Text中的字符串进行转码，让其支持中文
    utf16to8: function utf16to8(str) {
      var out, i, len, c;

      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007F) {
          out += str.charAt(i);
        } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
          out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        } else {
          out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        }
      }
      return out;
    },

    draw: function draw(str, canvas, cavW, cavH, ecc) {
      var that = this;
      ecclevel = ecc || ecclevel;
      canvas = canvas || _canvas;
      if (!canvas) {
        console.warn('No canvas provided to draw QR code in!');
        return;
      }

      var size = Math.min(cavW, cavH);
      str = that.utf16to8(str); //增加中文显示

      var frame = that.getFrame(str),
          ctx = wx.createCanvasContext(canvas),
          px = Math.round(size / (width + 8));
      var roundedSize = px * (width + 8),
          offset = Math.floor((size - roundedSize) / 2);
      size = roundedSize;
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, cavW, cavW);
      ctx.setFillStyle('#000000');
      for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
          if (frame[j * width + i]) {
            ctx.fillRect(px * (4 + i) + offset, px * (4 + j) + offset, px, px);
          }
        }
      }
      ctx.draw();
    }
  };
  module.exports = { api: api };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJhZGVsdGEiLCJ2cGF0IiwiZm10d29yZCIsImVjY2Jsb2NrcyIsImdsb2ciLCJnZXhwIiwic3RyaW5idWYiLCJlY2NidWYiLCJxcmZyYW1lIiwiZnJhbWFzayIsInJsZW5zIiwidmVyc2lvbiIsIndpZHRoIiwibmVjY2JsazEiLCJuZWNjYmxrMiIsImRhdGFibGt3IiwiZWNjYmxrd2lkIiwiZWNjbGV2ZWwiLCJzZXRtYXNrIiwieCIsInkiLCJidCIsInB1dGFsaWduIiwiaiIsIm1vZG5uIiwiZ2VucG9seSIsImFwcGVuZHJzIiwiZGF0YSIsImRsZW4iLCJlY2J1ZiIsImVjbGVuIiwiaSIsImZiIiwiaXNtYXNrZWQiLCJhcHBseW1hc2siLCJtIiwicjN4IiwicjN5IiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJiYWRydW5zIiwibGVuZ3RoIiwicnVuc2JhZCIsImJhZGNoZWNrIiwiaCIsImIiLCJiMSIsInRoaXNiYWQiLCJidyIsImJpZyIsImNvdW50IiwiZ2VuZnJhbWUiLCJpbnN0cmluZyIsImsiLCJ0IiwidiIsInNsaWNlIiwiY2hhckNvZGVBdCIsIl9jYW52YXMiLCJhcGkiLCJ2YWwiLCJzaXplIiwiX3NpemUiLCJjYW52YXMiLCJlbCIsImdldEZyYW1lIiwic3RyaW5nIiwidXRmMTZ0bzgiLCJzdHIiLCJvdXQiLCJsZW4iLCJjIiwiY2hhckF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZHJhdyIsImNhdlciLCJjYXZIIiwiZWNjIiwidGhhdCIsImNvbnNvbGUiLCJ3YXJuIiwiTWF0aCIsIm1pbiIsImZyYW1lIiwiY3R4Iiwid3giLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicHgiLCJyb3VuZCIsInJvdW5kZWRTaXplIiwib2Zmc2V0IiwiZmxvb3IiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBRSxZQUFZOztBQUVaO0FBQ0EsTUFBSUEs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R0FBM0IsRUFBZ0M7QUFDOUIsYUFBSyxJQUFJUixJQUFJLENBQWIsRUFBZ0JBLElBQUlYLEtBQXBCLEVBQTJCVyxHQUEzQixFQUFnQztBQUM5QixjQUFJK0QsTUFBTS9ELElBQUlYLEtBQUosR0FBWW1CLENBQWxCLENBQUosRUFBMEI7QUFDeEJ3RCxnQkFBSVMsUUFBSixDQUFhTixNQUFNLElBQUkzRCxDQUFWLElBQWU4RCxNQUE1QixFQUFvQ0gsTUFBTSxJQUFJbkUsQ0FBVixJQUFlc0UsTUFBbkQsRUFBMkRILEVBQTNELEVBQStEQSxFQUEvRDtBQUNEO0FBQ0Y7QUFDRjtBQUNESCxVQUFJVixJQUFKO0FBQ0Q7QUFoRk8sR0FBVjtBQWtGQW9CLFNBQU9DLE9BQVAsR0FBaUIsRUFBRXJDLFFBQUYsRUFBakI7QUFFRCxDQS93QkEsRUFBRCIsImZpbGUiOiJxcmNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIhKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gYWxpZ25tZW50IHBhdHRlcm5cclxuICB2YXIgYWRlbHRhID0gW1xyXG4gICAgMCwgMTEsIDE1LCAxOSwgMjMsIDI3LCAzMSxcclxuICAgIDE2LCAxOCwgMjAsIDIyLCAyNCwgMjYsIDI4LCAyMCwgMjIsIDI0LCAyNCwgMjYsIDI4LCAyOCwgMjIsIDI0LCAyNCxcclxuICAgIDI2LCAyNiwgMjgsIDI4LCAyNCwgMjQsIDI2LCAyNiwgMjYsIDI4LCAyOCwgMjQsIDI2LCAyNiwgMjYsIDI4LCAyOFxyXG4gIF07XHJcblxyXG4gIC8vIHZlcnNpb24gYmxvY2tcclxuICB2YXIgdnBhdCA9IFtcclxuICAgIDB4Yzk0LCAweDViYywgMHhhOTksIDB4NGQzLCAweGJmNiwgMHg3NjIsIDB4ODQ3LCAweDYwZCxcclxuICAgIDB4OTI4LCAweGI3OCwgMHg0NWQsIDB4YTE3LCAweDUzMiwgMHg5YTYsIDB4NjgzLCAweDhjOSxcclxuICAgIDB4N2VjLCAweGVjNCwgMHgxZTEsIDB4ZmFiLCAweDA4ZSwgMHhjMWEsIDB4MzNmLCAweGQ3NSxcclxuICAgIDB4MjUwLCAweDlkNSwgMHg2ZjAsIDB4OGJhLCAweDc5ZiwgMHhiMGIsIDB4NDJlLCAweGE2NCxcclxuICAgIDB4NTQxLCAweGM2OVxyXG4gIF07XHJcblxyXG4gIC8vIGZpbmFsIGZvcm1hdCBiaXRzIHdpdGggbWFzazogbGV2ZWwgPDwgMyB8IG1hc2tcclxuICB2YXIgZm10d29yZCA9IFtcclxuICAgIDB4NzdjNCwgMHg3MmYzLCAweDdkYWEsIDB4Nzg5ZCwgMHg2NjJmLCAweDYzMTgsIDB4NmM0MSwgMHg2OTc2LCAgICAvL0xcclxuICAgIDB4NTQxMiwgMHg1MTI1LCAweDVlN2MsIDB4NWI0YiwgMHg0NWY5LCAweDQwY2UsIDB4NGY5NywgMHg0YWEwLCAgICAvL01cclxuICAgIDB4MzU1ZiwgMHgzMDY4LCAweDNmMzEsIDB4M2EwNiwgMHgyNGI0LCAweDIxODMsIDB4MmVkYSwgMHgyYmVkLCAgICAvL1FcclxuICAgIDB4MTY4OSwgMHgxM2JlLCAweDFjZTcsIDB4MTlkMCwgMHgwNzYyLCAweDAyNTUsIDB4MGQwYywgMHgwODNiICAgIC8vSFxyXG4gIF07XHJcblxyXG4gIC8vIDQgcGVyIHZlcnNpb246IG51bWJlciBvZiBibG9ja3MgMSwyOyBkYXRhIHdpZHRoOyBlY2Mgd2lkdGhcclxuICB2YXIgZWNjYmxvY2tzID0gW1xyXG4gICAgMSwgMCwgMTksIDcsIDEsIDAsIDE2LCAxMCwgMSwgMCwgMTMsIDEzLCAxLCAwLCA5LCAxNyxcclxuICAgIDEsIDAsIDM0LCAxMCwgMSwgMCwgMjgsIDE2LCAxLCAwLCAyMiwgMjIsIDEsIDAsIDE2LCAyOCxcclxuICAgIDEsIDAsIDU1LCAxNSwgMSwgMCwgNDQsIDI2LCAyLCAwLCAxNywgMTgsIDIsIDAsIDEzLCAyMixcclxuICAgIDEsIDAsIDgwLCAyMCwgMiwgMCwgMzIsIDE4LCAyLCAwLCAyNCwgMjYsIDQsIDAsIDksIDE2LFxyXG4gICAgMSwgMCwgMTA4LCAyNiwgMiwgMCwgNDMsIDI0LCAyLCAyLCAxNSwgMTgsIDIsIDIsIDExLCAyMixcclxuICAgIDIsIDAsIDY4LCAxOCwgNCwgMCwgMjcsIDE2LCA0LCAwLCAxOSwgMjQsIDQsIDAsIDE1LCAyOCxcclxuICAgIDIsIDAsIDc4LCAyMCwgNCwgMCwgMzEsIDE4LCAyLCA0LCAxNCwgMTgsIDQsIDEsIDEzLCAyNixcclxuICAgIDIsIDAsIDk3LCAyNCwgMiwgMiwgMzgsIDIyLCA0LCAyLCAxOCwgMjIsIDQsIDIsIDE0LCAyNixcclxuICAgIDIsIDAsIDExNiwgMzAsIDMsIDIsIDM2LCAyMiwgNCwgNCwgMTYsIDIwLCA0LCA0LCAxMiwgMjQsXHJcbiAgICAyLCAyLCA2OCwgMTgsIDQsIDEsIDQzLCAyNiwgNiwgMiwgMTksIDI0LCA2LCAyLCAxNSwgMjgsXHJcbiAgICA0LCAwLCA4MSwgMjAsIDEsIDQsIDUwLCAzMCwgNCwgNCwgMjIsIDI4LCAzLCA4LCAxMiwgMjQsXHJcbiAgICAyLCAyLCA5MiwgMjQsIDYsIDIsIDM2LCAyMiwgNCwgNiwgMjAsIDI2LCA3LCA0LCAxNCwgMjgsXHJcbiAgICA0LCAwLCAxMDcsIDI2LCA4LCAxLCAzNywgMjIsIDgsIDQsIDIwLCAyNCwgMTIsIDQsIDExLCAyMixcclxuICAgIDMsIDEsIDExNSwgMzAsIDQsIDUsIDQwLCAyNCwgMTEsIDUsIDE2LCAyMCwgMTEsIDUsIDEyLCAyNCxcclxuICAgIDUsIDEsIDg3LCAyMiwgNSwgNSwgNDEsIDI0LCA1LCA3LCAyNCwgMzAsIDExLCA3LCAxMiwgMjQsXHJcbiAgICA1LCAxLCA5OCwgMjQsIDcsIDMsIDQ1LCAyOCwgMTUsIDIsIDE5LCAyNCwgMywgMTMsIDE1LCAzMCxcclxuICAgIDEsIDUsIDEwNywgMjgsIDEwLCAxLCA0NiwgMjgsIDEsIDE1LCAyMiwgMjgsIDIsIDE3LCAxNCwgMjgsXHJcbiAgICA1LCAxLCAxMjAsIDMwLCA5LCA0LCA0MywgMjYsIDE3LCAxLCAyMiwgMjgsIDIsIDE5LCAxNCwgMjgsXHJcbiAgICAzLCA0LCAxMTMsIDI4LCAzLCAxMSwgNDQsIDI2LCAxNywgNCwgMjEsIDI2LCA5LCAxNiwgMTMsIDI2LFxyXG4gICAgMywgNSwgMTA3LCAyOCwgMywgMTMsIDQxLCAyNiwgMTUsIDUsIDI0LCAzMCwgMTUsIDEwLCAxNSwgMjgsXHJcbiAgICA0LCA0LCAxMTYsIDI4LCAxNywgMCwgNDIsIDI2LCAxNywgNiwgMjIsIDI4LCAxOSwgNiwgMTYsIDMwLFxyXG4gICAgMiwgNywgMTExLCAyOCwgMTcsIDAsIDQ2LCAyOCwgNywgMTYsIDI0LCAzMCwgMzQsIDAsIDEzLCAyNCxcclxuICAgIDQsIDUsIDEyMSwgMzAsIDQsIDE0LCA0NywgMjgsIDExLCAxNCwgMjQsIDMwLCAxNiwgMTQsIDE1LCAzMCxcclxuICAgIDYsIDQsIDExNywgMzAsIDYsIDE0LCA0NSwgMjgsIDExLCAxNiwgMjQsIDMwLCAzMCwgMiwgMTYsIDMwLFxyXG4gICAgOCwgNCwgMTA2LCAyNiwgOCwgMTMsIDQ3LCAyOCwgNywgMjIsIDI0LCAzMCwgMjIsIDEzLCAxNSwgMzAsXHJcbiAgICAxMCwgMiwgMTE0LCAyOCwgMTksIDQsIDQ2LCAyOCwgMjgsIDYsIDIyLCAyOCwgMzMsIDQsIDE2LCAzMCxcclxuICAgIDgsIDQsIDEyMiwgMzAsIDIyLCAzLCA0NSwgMjgsIDgsIDI2LCAyMywgMzAsIDEyLCAyOCwgMTUsIDMwLFxyXG4gICAgMywgMTAsIDExNywgMzAsIDMsIDIzLCA0NSwgMjgsIDQsIDMxLCAyNCwgMzAsIDExLCAzMSwgMTUsIDMwLFxyXG4gICAgNywgNywgMTE2LCAzMCwgMjEsIDcsIDQ1LCAyOCwgMSwgMzcsIDIzLCAzMCwgMTksIDI2LCAxNSwgMzAsXHJcbiAgICA1LCAxMCwgMTE1LCAzMCwgMTksIDEwLCA0NywgMjgsIDE1LCAyNSwgMjQsIDMwLCAyMywgMjUsIDE1LCAzMCxcclxuICAgIDEzLCAzLCAxMTUsIDMwLCAyLCAyOSwgNDYsIDI4LCA0MiwgMSwgMjQsIDMwLCAyMywgMjgsIDE1LCAzMCxcclxuICAgIDE3LCAwLCAxMTUsIDMwLCAxMCwgMjMsIDQ2LCAyOCwgMTAsIDM1LCAyNCwgMzAsIDE5LCAzNSwgMTUsIDMwLFxyXG4gICAgMTcsIDEsIDExNSwgMzAsIDE0LCAyMSwgNDYsIDI4LCAyOSwgMTksIDI0LCAzMCwgMTEsIDQ2LCAxNSwgMzAsXHJcbiAgICAxMywgNiwgMTE1LCAzMCwgMTQsIDIzLCA0NiwgMjgsIDQ0LCA3LCAyNCwgMzAsIDU5LCAxLCAxNiwgMzAsXHJcbiAgICAxMiwgNywgMTIxLCAzMCwgMTIsIDI2LCA0NywgMjgsIDM5LCAxNCwgMjQsIDMwLCAyMiwgNDEsIDE1LCAzMCxcclxuICAgIDYsIDE0LCAxMjEsIDMwLCA2LCAzNCwgNDcsIDI4LCA0NiwgMTAsIDI0LCAzMCwgMiwgNjQsIDE1LCAzMCxcclxuICAgIDE3LCA0LCAxMjIsIDMwLCAyOSwgMTQsIDQ2LCAyOCwgNDksIDEwLCAyNCwgMzAsIDI0LCA0NiwgMTUsIDMwLFxyXG4gICAgNCwgMTgsIDEyMiwgMzAsIDEzLCAzMiwgNDYsIDI4LCA0OCwgMTQsIDI0LCAzMCwgNDIsIDMyLCAxNSwgMzAsXHJcbiAgICAyMCwgNCwgMTE3LCAzMCwgNDAsIDcsIDQ3LCAyOCwgNDMsIDIyLCAyNCwgMzAsIDEwLCA2NywgMTUsIDMwLFxyXG4gICAgMTksIDYsIDExOCwgMzAsIDE4LCAzMSwgNDcsIDI4LCAzNCwgMzQsIDI0LCAzMCwgMjAsIDYxLCAxNSwgMzBcclxuICBdO1xyXG5cclxuICAvLyBHYWxvaXMgZmllbGQgbG9nIHRhYmxlXHJcbiAgdmFyIGdsb2cgPSBbXHJcbiAgICAweGZmLCAweDAwLCAweDAxLCAweDE5LCAweDAyLCAweDMyLCAweDFhLCAweGM2LCAweDAzLCAweGRmLCAweDMzLCAweGVlLCAweDFiLCAweDY4LCAweGM3LCAweDRiLFxyXG4gICAgMHgwNCwgMHg2NCwgMHhlMCwgMHgwZSwgMHgzNCwgMHg4ZCwgMHhlZiwgMHg4MSwgMHgxYywgMHhjMSwgMHg2OSwgMHhmOCwgMHhjOCwgMHgwOCwgMHg0YywgMHg3MSxcclxuICAgIDB4MDUsIDB4OGEsIDB4NjUsIDB4MmYsIDB4ZTEsIDB4MjQsIDB4MGYsIDB4MjEsIDB4MzUsIDB4OTMsIDB4OGUsIDB4ZGEsIDB4ZjAsIDB4MTIsIDB4ODIsIDB4NDUsXHJcbiAgICAweDFkLCAweGI1LCAweGMyLCAweDdkLCAweDZhLCAweDI3LCAweGY5LCAweGI5LCAweGM5LCAweDlhLCAweDA5LCAweDc4LCAweDRkLCAweGU0LCAweDcyLCAweGE2LFxyXG4gICAgMHgwNiwgMHhiZiwgMHg4YiwgMHg2MiwgMHg2NiwgMHhkZCwgMHgzMCwgMHhmZCwgMHhlMiwgMHg5OCwgMHgyNSwgMHhiMywgMHgxMCwgMHg5MSwgMHgyMiwgMHg4OCxcclxuICAgIDB4MzYsIDB4ZDAsIDB4OTQsIDB4Y2UsIDB4OGYsIDB4OTYsIDB4ZGIsIDB4YmQsIDB4ZjEsIDB4ZDIsIDB4MTMsIDB4NWMsIDB4ODMsIDB4MzgsIDB4NDYsIDB4NDAsXHJcbiAgICAweDFlLCAweDQyLCAweGI2LCAweGEzLCAweGMzLCAweDQ4LCAweDdlLCAweDZlLCAweDZiLCAweDNhLCAweDI4LCAweDU0LCAweGZhLCAweDg1LCAweGJhLCAweDNkLFxyXG4gICAgMHhjYSwgMHg1ZSwgMHg5YiwgMHg5ZiwgMHgwYSwgMHgxNSwgMHg3OSwgMHgyYiwgMHg0ZSwgMHhkNCwgMHhlNSwgMHhhYywgMHg3MywgMHhmMywgMHhhNywgMHg1NyxcclxuICAgIDB4MDcsIDB4NzAsIDB4YzAsIDB4ZjcsIDB4OGMsIDB4ODAsIDB4NjMsIDB4MGQsIDB4NjcsIDB4NGEsIDB4ZGUsIDB4ZWQsIDB4MzEsIDB4YzUsIDB4ZmUsIDB4MTgsXHJcbiAgICAweGUzLCAweGE1LCAweDk5LCAweDc3LCAweDI2LCAweGI4LCAweGI0LCAweDdjLCAweDExLCAweDQ0LCAweDkyLCAweGQ5LCAweDIzLCAweDIwLCAweDg5LCAweDJlLFxyXG4gICAgMHgzNywgMHgzZiwgMHhkMSwgMHg1YiwgMHg5NSwgMHhiYywgMHhjZiwgMHhjZCwgMHg5MCwgMHg4NywgMHg5NywgMHhiMiwgMHhkYywgMHhmYywgMHhiZSwgMHg2MSxcclxuICAgIDB4ZjIsIDB4NTYsIDB4ZDMsIDB4YWIsIDB4MTQsIDB4MmEsIDB4NWQsIDB4OWUsIDB4ODQsIDB4M2MsIDB4MzksIDB4NTMsIDB4NDcsIDB4NmQsIDB4NDEsIDB4YTIsXHJcbiAgICAweDFmLCAweDJkLCAweDQzLCAweGQ4LCAweGI3LCAweDdiLCAweGE0LCAweDc2LCAweGM0LCAweDE3LCAweDQ5LCAweGVjLCAweDdmLCAweDBjLCAweDZmLCAweGY2LFxyXG4gICAgMHg2YywgMHhhMSwgMHgzYiwgMHg1MiwgMHgyOSwgMHg5ZCwgMHg1NSwgMHhhYSwgMHhmYiwgMHg2MCwgMHg4NiwgMHhiMSwgMHhiYiwgMHhjYywgMHgzZSwgMHg1YSxcclxuICAgIDB4Y2IsIDB4NTksIDB4NWYsIDB4YjAsIDB4OWMsIDB4YTksIDB4YTAsIDB4NTEsIDB4MGIsIDB4ZjUsIDB4MTYsIDB4ZWIsIDB4N2EsIDB4NzUsIDB4MmMsIDB4ZDcsXHJcbiAgICAweDRmLCAweGFlLCAweGQ1LCAweGU5LCAweGU2LCAweGU3LCAweGFkLCAweGU4LCAweDc0LCAweGQ2LCAweGY0LCAweGVhLCAweGE4LCAweDUwLCAweDU4LCAweGFmXHJcbiAgXTtcclxuXHJcbiAgLy8gR2FsaW9zIGZpZWxkIGV4cG9uZW50IHRhYmxlXHJcbiAgdmFyIGdleHAgPSBbXHJcbiAgICAweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFkLCAweDNhLCAweDc0LCAweGU4LCAweGNkLCAweDg3LCAweDEzLCAweDI2LFxyXG4gICAgMHg0YywgMHg5OCwgMHgyZCwgMHg1YSwgMHhiNCwgMHg3NSwgMHhlYSwgMHhjOSwgMHg4ZiwgMHgwMywgMHgwNiwgMHgwYywgMHgxOCwgMHgzMCwgMHg2MCwgMHhjMCxcclxuICAgIDB4OWQsIDB4MjcsIDB4NGUsIDB4OWMsIDB4MjUsIDB4NGEsIDB4OTQsIDB4MzUsIDB4NmEsIDB4ZDQsIDB4YjUsIDB4NzcsIDB4ZWUsIDB4YzEsIDB4OWYsIDB4MjMsXHJcbiAgICAweDQ2LCAweDhjLCAweDA1LCAweDBhLCAweDE0LCAweDI4LCAweDUwLCAweGEwLCAweDVkLCAweGJhLCAweDY5LCAweGQyLCAweGI5LCAweDZmLCAweGRlLCAweGExLFxyXG4gICAgMHg1ZiwgMHhiZSwgMHg2MSwgMHhjMiwgMHg5OSwgMHgyZiwgMHg1ZSwgMHhiYywgMHg2NSwgMHhjYSwgMHg4OSwgMHgwZiwgMHgxZSwgMHgzYywgMHg3OCwgMHhmMCxcclxuICAgIDB4ZmQsIDB4ZTcsIDB4ZDMsIDB4YmIsIDB4NmIsIDB4ZDYsIDB4YjEsIDB4N2YsIDB4ZmUsIDB4ZTEsIDB4ZGYsIDB4YTMsIDB4NWIsIDB4YjYsIDB4NzEsIDB4ZTIsXHJcbiAgICAweGQ5LCAweGFmLCAweDQzLCAweDg2LCAweDExLCAweDIyLCAweDQ0LCAweDg4LCAweDBkLCAweDFhLCAweDM0LCAweDY4LCAweGQwLCAweGJkLCAweDY3LCAweGNlLFxyXG4gICAgMHg4MSwgMHgxZiwgMHgzZSwgMHg3YywgMHhmOCwgMHhlZCwgMHhjNywgMHg5MywgMHgzYiwgMHg3NiwgMHhlYywgMHhjNSwgMHg5NywgMHgzMywgMHg2NiwgMHhjYyxcclxuICAgIDB4ODUsIDB4MTcsIDB4MmUsIDB4NWMsIDB4YjgsIDB4NmQsIDB4ZGEsIDB4YTksIDB4NGYsIDB4OWUsIDB4MjEsIDB4NDIsIDB4ODQsIDB4MTUsIDB4MmEsIDB4NTQsXHJcbiAgICAweGE4LCAweDRkLCAweDlhLCAweDI5LCAweDUyLCAweGE0LCAweDU1LCAweGFhLCAweDQ5LCAweDkyLCAweDM5LCAweDcyLCAweGU0LCAweGQ1LCAweGI3LCAweDczLFxyXG4gICAgMHhlNiwgMHhkMSwgMHhiZiwgMHg2MywgMHhjNiwgMHg5MSwgMHgzZiwgMHg3ZSwgMHhmYywgMHhlNSwgMHhkNywgMHhiMywgMHg3YiwgMHhmNiwgMHhmMSwgMHhmZixcclxuICAgIDB4ZTMsIDB4ZGIsIDB4YWIsIDB4NGIsIDB4OTYsIDB4MzEsIDB4NjIsIDB4YzQsIDB4OTUsIDB4MzcsIDB4NmUsIDB4ZGMsIDB4YTUsIDB4NTcsIDB4YWUsIDB4NDEsXHJcbiAgICAweDgyLCAweDE5LCAweDMyLCAweDY0LCAweGM4LCAweDhkLCAweDA3LCAweDBlLCAweDFjLCAweDM4LCAweDcwLCAweGUwLCAweGRkLCAweGE3LCAweDUzLCAweGE2LFxyXG4gICAgMHg1MSwgMHhhMiwgMHg1OSwgMHhiMiwgMHg3OSwgMHhmMiwgMHhmOSwgMHhlZiwgMHhjMywgMHg5YiwgMHgyYiwgMHg1NiwgMHhhYywgMHg0NSwgMHg4YSwgMHgwOSxcclxuICAgIDB4MTIsIDB4MjQsIDB4NDgsIDB4OTAsIDB4M2QsIDB4N2EsIDB4ZjQsIDB4ZjUsIDB4ZjcsIDB4ZjMsIDB4ZmIsIDB4ZWIsIDB4Y2IsIDB4OGIsIDB4MGIsIDB4MTYsXHJcbiAgICAweDJjLCAweDU4LCAweGIwLCAweDdkLCAweGZhLCAweGU5LCAweGNmLCAweDgzLCAweDFiLCAweDM2LCAweDZjLCAweGQ4LCAweGFkLCAweDQ3LCAweDhlLCAweDAwXHJcbiAgXTtcclxuXHJcbiAgLy8gV29ya2luZyBidWZmZXJzOlxyXG4gIC8vIGRhdGEgaW5wdXQgYW5kIGVjYyBhcHBlbmQsIGltYWdlIHdvcmtpbmcgYnVmZmVyLCBmaXhlZCBwYXJ0IG9mIGltYWdlLCBydW4gbGVuZ3RocyBmb3IgYmFkbmVzc1xyXG4gIHZhciBzdHJpbmJ1ZiA9IFtdLCBlY2NidWYgPSBbXSwgcXJmcmFtZSA9IFtdLCBmcmFtYXNrID0gW10sIHJsZW5zID0gW107XHJcbiAgLy8gQ29udHJvbCB2YWx1ZXMgLSB3aWR0aCBpcyBiYXNlZCBvbiB2ZXJzaW9uLCBsYXN0IDQgYXJlIGZyb20gdGFibGUuXHJcbiAgdmFyIHZlcnNpb24sIHdpZHRoLCBuZWNjYmxrMSwgbmVjY2JsazIsIGRhdGFibGt3LCBlY2NibGt3aWQ7XHJcbiAgdmFyIGVjY2xldmVsID0gMjtcclxuICAvLyBzZXQgYml0IHRvIGluZGljYXRlIGNlbGwgaW4gcXJmcmFtZSBpcyBpbW11dGFibGUuICBzeW1tZXRyaWMgYXJvdW5kIGRpYWdvbmFsXHJcbiAgZnVuY3Rpb24gc2V0bWFzayh4LCB5KSB7XHJcbiAgICB2YXIgYnQ7XHJcbiAgICBpZiAoeCA+IHkpIHtcclxuICAgICAgYnQgPSB4O1xyXG4gICAgICB4ID0geTtcclxuICAgICAgeSA9IGJ0O1xyXG4gICAgfVxyXG4gICAgLy8geSp5ID0gMSszKzUuLi5cclxuICAgIGJ0ID0geTtcclxuICAgIGJ0ICo9IHk7XHJcbiAgICBidCArPSB5O1xyXG4gICAgYnQgPj49IDE7XHJcbiAgICBidCArPSB4O1xyXG4gICAgZnJhbWFza1tidF0gPSAxO1xyXG4gIH1cclxuXHJcbiAgLy8gZW50ZXIgYWxpZ25tZW50IHBhdHRlcm4gLSBibGFjayB0byBxcmZyYW1lLCB3aGl0ZSB0byBtYXNrIChsYXRlciBibGFjayBmcmFtZSBtZXJnZWQgdG8gbWFzaylcclxuICBmdW5jdGlvbiBwdXRhbGlnbih4LCB5KSB7XHJcbiAgICB2YXIgajtcclxuXHJcbiAgICBxcmZyYW1lW3ggKyB3aWR0aCAqIHldID0gMTtcclxuICAgIGZvciAoaiA9IC0yOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgIHFyZnJhbWVbKHggKyBqKSArIHdpZHRoICogKHkgLSAyKV0gPSAxO1xyXG4gICAgICBxcmZyYW1lWyh4IC0gMikgKyB3aWR0aCAqICh5ICsgaiArIDEpXSA9IDE7XHJcbiAgICAgIHFyZnJhbWVbKHggKyAyKSArIHdpZHRoICogKHkgKyBqKV0gPSAxO1xyXG4gICAgICBxcmZyYW1lWyh4ICsgaiArIDEpICsgd2lkdGggKiAoeSArIDIpXSA9IDE7XHJcbiAgICB9XHJcbiAgICBmb3IgKGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgIHNldG1hc2soeCAtIDEsIHkgKyBqKTtcclxuICAgICAgc2V0bWFzayh4ICsgMSwgeSAtIGopO1xyXG4gICAgICBzZXRtYXNrKHggLSBqLCB5IC0gMSk7XHJcbiAgICAgIHNldG1hc2soeCArIGosIHkgKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gUmVlZCBTb2xvbW9uIGVycm9yIGNvcnJlY3Rpb25cclxuICAvLyBleHBvbmVudGlhdGlvbiBtb2QgTlxyXG4gIGZ1bmN0aW9uIG1vZG5uKHgpIHtcclxuICAgIHdoaWxlICh4ID49IDI1NSkge1xyXG4gICAgICB4IC09IDI1NTtcclxuICAgICAgeCA9ICh4ID4+IDgpICsgKHggJiAyNTUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG5cclxuICB2YXIgZ2VucG9seSA9IFtdO1xyXG5cclxuICAvLyBDYWxjdWxhdGUgYW5kIGFwcGVuZCBFQ0MgZGF0YSB0byBkYXRhIGJsb2NrLiAgQmxvY2sgaXMgaW4gc3RyaW5idWYsIGluZGV4ZXMgdG8gYnVmZmVycyBnaXZlbi5cclxuICBmdW5jdGlvbiBhcHBlbmRycyhkYXRhLCBkbGVuLCBlY2J1ZiwgZWNsZW4pIHtcclxuICAgIHZhciBpLCBqLCBmYjtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgZWNsZW47IGkrKylcclxuICAgICAgc3RyaW5idWZbZWNidWYgKyBpXSA9IDA7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgZGxlbjsgaSsrKSB7XHJcbiAgICAgIGZiID0gZ2xvZ1tzdHJpbmJ1ZltkYXRhICsgaV0gXiBzdHJpbmJ1ZltlY2J1Zl1dO1xyXG4gICAgICBpZiAoZmIgIT0gMjU1KSAgICAgLyogZmIgdGVybSBpcyBub24temVybyAqL1xyXG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBlY2xlbjsgaisrKVxyXG4gICAgICAgICAgc3RyaW5idWZbZWNidWYgKyBqIC0gMV0gPSBzdHJpbmJ1ZltlY2J1ZiArIGpdIF4gZ2V4cFttb2RubihmYiArIGdlbnBvbHlbZWNsZW4gLSBqXSldO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgZm9yIChqID0gZWNidWY7IGogPCBlY2J1ZiArIGVjbGVuOyBqKyspXHJcbiAgICAgICAgICBzdHJpbmJ1ZltqXSA9IHN0cmluYnVmW2ogKyAxXTtcclxuICAgICAgc3RyaW5idWZbZWNidWYgKyBlY2xlbiAtIDFdID0gZmIgPT0gMjU1ID8gMCA6IGdleHBbbW9kbm4oZmIgKyBnZW5wb2x5WzBdKV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIEZyYW1lIGRhdGEgaW5zZXJ0IGZvbGxvd2luZyB0aGUgcGF0aCBydWxlc1xyXG5cclxuICAvLyBjaGVjayBtYXNrIC0gc2luY2Ugc3ltbWV0cmljYWwgdXNlIGhhbGYuXHJcbiAgZnVuY3Rpb24gaXNtYXNrZWQoeCwgeSkge1xyXG4gICAgdmFyIGJ0O1xyXG4gICAgaWYgKHggPiB5KSB7XHJcbiAgICAgIGJ0ID0geDtcclxuICAgICAgeCA9IHk7XHJcbiAgICAgIHkgPSBidDtcclxuICAgIH1cclxuICAgIGJ0ID0geTtcclxuICAgIGJ0ICs9IHkgKiB5O1xyXG4gICAgYnQgPj49IDE7XHJcbiAgICBidCArPSB4O1xyXG4gICAgcmV0dXJuIGZyYW1hc2tbYnRdO1xyXG4gIH1cclxuXHJcbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyAgQXBwbHkgdGhlIHNlbGVjdGVkIG1hc2sgb3V0IG9mIHRoZSA4LlxyXG4gIGZ1bmN0aW9uIGFwcGx5bWFzayhtKSB7XHJcbiAgICB2YXIgeCwgeSwgcjN4LCByM3k7XHJcblxyXG4gICAgc3dpdGNoIChtKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcclxuICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxyXG4gICAgICAgICAgICBpZiAoISgoeCArIHkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxyXG4gICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoOyB4KyspXHJcbiAgICAgICAgICAgIGlmICghKHkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcclxuICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xyXG4gICAgICAgICAgaWYgKHIzeSA9PSAzKVxyXG4gICAgICAgICAgICByM3kgPSAwO1xyXG4gICAgICAgICAgZm9yIChyM3ggPSByM3ksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcclxuICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxyXG4gICAgICAgICAgZm9yIChyM3ggPSAwLCByM3kgPSAoKHkgPj4gMSkgJiAxKSwgeCA9IDA7IHggPCB3aWR0aDsgeCsrICwgcjN4KyspIHtcclxuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgcjN4ID0gMDtcclxuICAgICAgICAgICAgICByM3kgPSAhcjN5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcjN5ICYmICFpc21hc2tlZCh4LCB5KSlcclxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICBmb3IgKHIzeSA9IDAsIHkgPSAwOyB5IDwgd2lkdGg7IHkrKyAsIHIzeSsrKSB7XHJcbiAgICAgICAgICBpZiAocjN5ID09IDMpXHJcbiAgICAgICAgICAgIHIzeSA9IDA7XHJcbiAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcclxuICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICBpZiAoISgoeCAmIHkgJiAxKSArICEoIXIzeCB8ICFyM3kpKSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA2OlxyXG4gICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrICwgcjN5KyspIHtcclxuICAgICAgICAgIGlmIChyM3kgPT0gMylcclxuICAgICAgICAgICAgcjN5ID0gMDtcclxuICAgICAgICAgIGZvciAocjN4ID0gMCwgeCA9IDA7IHggPCB3aWR0aDsgeCsrICwgcjN4KyspIHtcclxuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxyXG4gICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgIGlmICghKCgoeCAmIHkgJiAxKSArIChyM3ggJiYgKHIzeCA9PSByM3kpKSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA3OlxyXG4gICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrICwgcjN5KyspIHtcclxuICAgICAgICAgIGlmIChyM3kgPT0gMylcclxuICAgICAgICAgICAgcjN5ID0gMDtcclxuICAgICAgICAgIGZvciAocjN4ID0gMCwgeCA9IDA7IHggPCB3aWR0aDsgeCsrICwgcjN4KyspIHtcclxuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxyXG4gICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgIGlmICghKCgocjN4ICYmIChyM3ggPT0gcjN5KSkgKyAoKHggKyB5KSAmIDEpKSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcclxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gQmFkbmVzcyBjb2VmZmljaWVudHMuXHJcbiAgdmFyIE4xID0gMywgTjIgPSAzLCBOMyA9IDQwLCBONCA9IDEwO1xyXG5cclxuICAvLyBVc2luZyB0aGUgdGFibGUgb2YgdGhlIGxlbmd0aCBvZiBlYWNoIHJ1biwgY2FsY3VsYXRlIHRoZSBhbW91bnQgb2YgYmFkIGltYWdlXHJcbiAgLy8gLSBsb25nIHJ1bnMgb3IgdGhvc2UgdGhhdCBsb29rIGxpa2UgZmluZGVyczsgY2FsbGVkIHR3aWNlLCBvbmNlIGVhY2ggZm9yIFggYW5kIFlcclxuICBmdW5jdGlvbiBiYWRydW5zKGxlbmd0aCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgcnVuc2JhZCA9IDA7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDw9IGxlbmd0aDsgaSsrKVxyXG4gICAgICBpZiAocmxlbnNbaV0gPj0gNSlcclxuICAgICAgICBydW5zYmFkICs9IE4xICsgcmxlbnNbaV0gLSA1O1xyXG4gICAgLy8gQndCQkJ3QiBhcyBpbiBmaW5kZXJcclxuICAgIGZvciAoaSA9IDM7IGkgPCBsZW5ndGggLSAxOyBpICs9IDIpXHJcbiAgICAgIGlmIChybGVuc1tpIC0gMl0gPT0gcmxlbnNbaSArIDJdXHJcbiAgICAgICAgJiYgcmxlbnNbaSArIDJdID09IHJsZW5zW2kgLSAxXVxyXG4gICAgICAgICYmIHJsZW5zW2kgLSAxXSA9PSBybGVuc1tpICsgMV1cclxuICAgICAgICAmJiBybGVuc1tpIC0gMV0gKiAzID09IHJsZW5zW2ldXHJcbiAgICAgICAgLy8gd2hpdGUgYXJvdW5kIHRoZSBibGFjayBwYXR0ZXJuPyBOb3QgcGFydCBvZiBzcGVjXHJcbiAgICAgICAgJiYgKHJsZW5zW2kgLSAzXSA9PSAwIC8vIGJlZ2lubmluZ1xyXG4gICAgICAgICAgfHwgaSArIDMgPiBsZW5ndGggIC8vIGVuZFxyXG4gICAgICAgICAgfHwgcmxlbnNbaSAtIDNdICogMyA+PSBybGVuc1tpXSAqIDQgfHwgcmxlbnNbaSArIDNdICogMyA+PSBybGVuc1tpXSAqIDQpXHJcbiAgICAgIClcclxuICAgICAgICBydW5zYmFkICs9IE4zO1xyXG4gICAgcmV0dXJuIHJ1bnNiYWQ7XHJcbiAgfVxyXG5cclxuICAvLyBDYWxjdWxhdGUgaG93IGJhZCB0aGUgbWFza2VkIGltYWdlIGlzIC0gYmxvY2tzLCBpbWJhbGFuY2UsIHJ1bnMsIG9yIGZpbmRlcnMuXHJcbiAgZnVuY3Rpb24gYmFkY2hlY2soKSB7XHJcbiAgICB2YXIgeCwgeSwgaCwgYiwgYjE7XHJcbiAgICB2YXIgdGhpc2JhZCA9IDA7XHJcbiAgICB2YXIgYncgPSAwO1xyXG5cclxuICAgIC8vIGJsb2NrcyBvZiBzYW1lIGNvbG9yLlxyXG4gICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoIC0gMTsgeSsrKVxyXG4gICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGggLSAxOyB4KyspXHJcbiAgICAgICAgaWYgKChxcmZyYW1lW3ggKyB3aWR0aCAqIHldICYmIHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogeV1cclxuICAgICAgICAgICYmIHFyZnJhbWVbeCArIHdpZHRoICogKHkgKyAxKV0gJiYgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiAoeSArIDEpXSkgLy8gYWxsIGJsYWNrXHJcbiAgICAgICAgICB8fCAhKHFyZnJhbWVbeCArIHdpZHRoICogeV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiB5XVxyXG4gICAgICAgICAgICB8fCBxcmZyYW1lW3ggKyB3aWR0aCAqICh5ICsgMSldIHx8IHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogKHkgKyAxKV0pKSAvLyBhbGwgd2hpdGVcclxuICAgICAgICAgIHRoaXNiYWQgKz0gTjI7XHJcblxyXG4gICAgLy8gWCBydW5zXHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKykge1xyXG4gICAgICBybGVuc1swXSA9IDA7XHJcbiAgICAgIGZvciAoaCA9IGIgPSB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcclxuICAgICAgICAgIHJsZW5zW2hdKys7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgcmxlbnNbKytoXSA9IDE7XHJcbiAgICAgICAgYiA9IGIxO1xyXG4gICAgICAgIGJ3ICs9IGIgPyAxIDogLTE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpc2JhZCArPSBiYWRydW5zKGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJsYWNrL3doaXRlIGltYmFsYW5jZVxyXG4gICAgaWYgKGJ3IDwgMClcclxuICAgICAgYncgPSAtYnc7XHJcblxyXG4gICAgdmFyIGJpZyA9IGJ3O1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIGJpZyArPSBiaWcgPDwgMjtcclxuICAgIGJpZyA8PD0gMTtcclxuICAgIHdoaWxlIChiaWcgPiB3aWR0aCAqIHdpZHRoKVxyXG4gICAgICBiaWcgLT0gd2lkdGggKiB3aWR0aCwgY291bnQrKztcclxuICAgIHRoaXNiYWQgKz0gY291bnQgKiBONDtcclxuXHJcbiAgICAvLyBZIHJ1bnNcclxuICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgIHJsZW5zWzBdID0gMDtcclxuICAgICAgZm9yIChoID0gYiA9IHkgPSAwOyB5IDwgd2lkdGg7IHkrKykge1xyXG4gICAgICAgIGlmICgoYjEgPSBxcmZyYW1lW3ggKyB3aWR0aCAqIHldKSA9PSBiKVxyXG4gICAgICAgICAgcmxlbnNbaF0rKztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBybGVuc1srK2hdID0gMTtcclxuICAgICAgICBiID0gYjE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpc2JhZCArPSBiYWRydW5zKGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXNiYWQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5mcmFtZShpbnN0cmluZykge1xyXG4gICAgdmFyIHgsIHksIGssIHQsIHYsIGksIGosIG07XHJcblxyXG4gICAgLy8gZmluZCB0aGUgc21hbGxlc3QgdmVyc2lvbiB0aGF0IGZpdHMgdGhlIHN0cmluZ1xyXG4gICAgdCA9IGluc3RyaW5nLmxlbmd0aDtcclxuICAgIHZlcnNpb24gPSAwO1xyXG4gICAgZG8ge1xyXG4gICAgICB2ZXJzaW9uKys7XHJcbiAgICAgIGsgPSAoZWNjbGV2ZWwgLSAxKSAqIDQgKyAodmVyc2lvbiAtIDEpICogMTY7XHJcbiAgICAgIG5lY2NibGsxID0gZWNjYmxvY2tzW2srK107XHJcbiAgICAgIG5lY2NibGsyID0gZWNjYmxvY2tzW2srK107XHJcbiAgICAgIGRhdGFibGt3ID0gZWNjYmxvY2tzW2srK107XHJcbiAgICAgIGVjY2Jsa3dpZCA9IGVjY2Jsb2Nrc1trXTtcclxuICAgICAgayA9IGRhdGFibGt3ICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazIgLSAzICsgKHZlcnNpb24gPD0gOSk7XHJcbiAgICAgIGlmICh0IDw9IGspXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9IHdoaWxlICh2ZXJzaW9uIDwgNDApO1xyXG5cclxuICAgIC8vIEZJWE1FIC0gaW5zdXJlIHRoYXQgaXQgZml0cyBpbnN0ZWQgb2YgYmVpbmcgdHJ1bmNhdGVkXHJcbiAgICB3aWR0aCA9IDE3ICsgNCAqIHZlcnNpb247XHJcblxyXG4gICAgLy8gYWxsb2NhdGUsIGNsZWFyIGFuZCBzZXR1cCBkYXRhIHN0cnVjdHVyZXNcclxuICAgIHYgPSBkYXRhYmxrdyArIChkYXRhYmxrdyArIGVjY2Jsa3dpZCkgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcclxuICAgIGZvciAodCA9IDA7IHQgPCB2OyB0KyspXHJcbiAgICAgIGVjY2J1Zlt0XSA9IDA7XHJcbiAgICBzdHJpbmJ1ZiA9IGluc3RyaW5nLnNsaWNlKDApO1xyXG5cclxuICAgIGZvciAodCA9IDA7IHQgPCB3aWR0aCAqIHdpZHRoOyB0KyspXHJcbiAgICAgIHFyZnJhbWVbdF0gPSAwO1xyXG5cclxuICAgIGZvciAodCA9IDA7IHQgPCAod2lkdGggKiAod2lkdGggKyAxKSArIDEpIC8gMjsgdCsrKVxyXG4gICAgICBmcmFtYXNrW3RdID0gMDtcclxuXHJcbiAgICAvLyBpbnNlcnQgZmluZGVycyAtIGJsYWNrIHRvIGZyYW1lLCB3aGl0ZSB0byBtYXNrXHJcbiAgICBmb3IgKHQgPSAwOyB0IDwgMzsgdCsrKSB7XHJcbiAgICAgIGsgPSAwO1xyXG4gICAgICB5ID0gMDtcclxuICAgICAgaWYgKHQgPT0gMSlcclxuICAgICAgICBrID0gKHdpZHRoIC0gNyk7XHJcbiAgICAgIGlmICh0ID09IDIpXHJcbiAgICAgICAgeSA9ICh3aWR0aCAtIDcpO1xyXG4gICAgICBxcmZyYW1lWyh5ICsgMykgKyB3aWR0aCAqIChrICsgMyldID0gMTtcclxuICAgICAgZm9yICh4ID0gMDsgeCA8IDY7IHgrKykge1xyXG4gICAgICAgIHFyZnJhbWVbKHkgKyB4KSArIHdpZHRoICoga10gPSAxO1xyXG4gICAgICAgIHFyZnJhbWVbeSArIHdpZHRoICogKGsgKyB4ICsgMSldID0gMTtcclxuICAgICAgICBxcmZyYW1lWyh5ICsgNikgKyB3aWR0aCAqIChrICsgeCldID0gMTtcclxuICAgICAgICBxcmZyYW1lWyh5ICsgeCArIDEpICsgd2lkdGggKiAoayArIDYpXSA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgZm9yICh4ID0gMTsgeCA8IDU7IHgrKykge1xyXG4gICAgICAgIHNldG1hc2soeSArIHgsIGsgKyAxKTtcclxuICAgICAgICBzZXRtYXNrKHkgKyAxLCBrICsgeCArIDEpO1xyXG4gICAgICAgIHNldG1hc2soeSArIDUsIGsgKyB4KTtcclxuICAgICAgICBzZXRtYXNrKHkgKyB4ICsgMSwgayArIDUpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAoeCA9IDI7IHggPCA0OyB4KyspIHtcclxuICAgICAgICBxcmZyYW1lWyh5ICsgeCkgKyB3aWR0aCAqIChrICsgMildID0gMTtcclxuICAgICAgICBxcmZyYW1lWyh5ICsgMikgKyB3aWR0aCAqIChrICsgeCArIDEpXSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIDQpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIHggKyAxKSArIHdpZHRoICogKGsgKyA0KV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxpZ25tZW50IGJsb2Nrc1xyXG4gICAgaWYgKHZlcnNpb24gPiAxKSB7XHJcbiAgICAgIHQgPSBhZGVsdGFbdmVyc2lvbl07XHJcbiAgICAgIHkgPSB3aWR0aCAtIDc7XHJcbiAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgeCA9IHdpZHRoIC0gNztcclxuICAgICAgICB3aGlsZSAoeCA+IHQgLSAzKSB7XHJcbiAgICAgICAgICBwdXRhbGlnbih4LCB5KTtcclxuICAgICAgICAgIGlmICh4IDwgdClcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB4IC09IHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5IDw9IHQgKyA5KVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgeSAtPSB0O1xyXG4gICAgICAgIHB1dGFsaWduKDYsIHkpO1xyXG4gICAgICAgIHB1dGFsaWduKHksIDYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2luZ2xlIGJsYWNrXHJcbiAgICBxcmZyYW1lWzggKyB3aWR0aCAqICh3aWR0aCAtIDgpXSA9IDE7XHJcblxyXG4gICAgLy8gdGltaW5nIGdhcCAtIG1hc2sgb25seVxyXG4gICAgZm9yICh5ID0gMDsgeSA8IDc7IHkrKykge1xyXG4gICAgICBzZXRtYXNrKDcsIHkpO1xyXG4gICAgICBzZXRtYXNrKHdpZHRoIC0gOCwgeSk7XHJcbiAgICAgIHNldG1hc2soNywgeSArIHdpZHRoIC0gNyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKHggPSAwOyB4IDwgODsgeCsrKSB7XHJcbiAgICAgIHNldG1hc2soeCwgNyk7XHJcbiAgICAgIHNldG1hc2soeCArIHdpZHRoIC0gOCwgNyk7XHJcbiAgICAgIHNldG1hc2soeCwgd2lkdGggLSA4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXNlcnZlIG1hc2stZm9ybWF0IGFyZWFcclxuICAgIGZvciAoeCA9IDA7IHggPCA5OyB4KyspXHJcbiAgICAgIHNldG1hc2soeCwgOCk7XHJcbiAgICBmb3IgKHggPSAwOyB4IDwgODsgeCsrKSB7XHJcbiAgICAgIHNldG1hc2soeCArIHdpZHRoIC0gOCwgOCk7XHJcbiAgICAgIHNldG1hc2soOCwgeCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKVxyXG4gICAgICBzZXRtYXNrKDgsIHkgKyB3aWR0aCAtIDcpO1xyXG5cclxuICAgIC8vIHRpbWluZyByb3cvY29sXHJcbiAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGggLSAxNDsgeCsrKVxyXG4gICAgICBpZiAoeCAmIDEpIHtcclxuICAgICAgICBzZXRtYXNrKDggKyB4LCA2KTtcclxuICAgICAgICBzZXRtYXNrKDYsIDggKyB4KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBxcmZyYW1lWyg4ICsgeCkgKyB3aWR0aCAqIDZdID0gMTtcclxuICAgICAgICBxcmZyYW1lWzYgKyB3aWR0aCAqICg4ICsgeCldID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgIC8vIHZlcnNpb24gYmxvY2tcclxuICAgIGlmICh2ZXJzaW9uID4gNikge1xyXG4gICAgICB0ID0gdnBhdFt2ZXJzaW9uIC0gN107XHJcbiAgICAgIGsgPSAxNztcclxuICAgICAgZm9yICh4ID0gMDsgeCA8IDY7IHgrKylcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgMzsgeSsrICwgay0tKVxyXG4gICAgICAgICAgaWYgKDEgJiAoayA+IDExID8gdmVyc2lvbiA+PiAoayAtIDEyKSA6IHQgPj4gaykpIHtcclxuICAgICAgICAgICAgcXJmcmFtZVsoNSAtIHgpICsgd2lkdGggKiAoMiAtIHkgKyB3aWR0aCAtIDExKV0gPSAxO1xyXG4gICAgICAgICAgICBxcmZyYW1lWygyIC0geSArIHdpZHRoIC0gMTEpICsgd2lkdGggKiAoNSAtIHgpXSA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0bWFzayg1IC0geCwgMiAtIHkgKyB3aWR0aCAtIDExKTtcclxuICAgICAgICAgICAgc2V0bWFzaygyIC0geSArIHdpZHRoIC0gMTEsIDUgLSB4KTtcclxuICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzeW5jIG1hc2sgYml0cyAtIG9ubHkgc2V0IGFib3ZlIGZvciB3aGl0ZSBzcGFjZXMsIHNvIGFkZCBpbiBibGFjayBiaXRzXHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcclxuICAgICAgZm9yICh4ID0gMDsgeCA8PSB5OyB4KyspXHJcbiAgICAgICAgaWYgKHFyZnJhbWVbeCArIHdpZHRoICogeV0pXHJcbiAgICAgICAgICBzZXRtYXNrKHgsIHkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnQgc3RyaW5nIHRvIGJpdHN0cmVhbVxyXG4gICAgLy8gOCBiaXQgZGF0YSB0byBRUi1jb2RlZCA4IGJpdCBkYXRhIChudW1lcmljIG9yIGFscGhhbnVtLCBvciBrYW5qaSBub3Qgc3VwcG9ydGVkKVxyXG4gICAgdiA9IHN0cmluYnVmLmxlbmd0aDtcclxuXHJcbiAgICAvLyBzdHJpbmcgdG8gYXJyYXlcclxuICAgIGZvciAoaSA9IDA7IGkgPCB2OyBpKyspXHJcbiAgICAgIGVjY2J1ZltpXSA9IHN0cmluYnVmLmNoYXJDb2RlQXQoaSk7XHJcbiAgICBzdHJpbmJ1ZiA9IGVjY2J1Zi5zbGljZSgwKTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgbWF4IHN0cmluZyBsZW5ndGhcclxuICAgIHggPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyO1xyXG4gICAgaWYgKHYgPj0geCAtIDIpIHtcclxuICAgICAgdiA9IHggLSAyO1xyXG4gICAgICBpZiAodmVyc2lvbiA+IDkpXHJcbiAgICAgICAgdi0tO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaWZ0IGFuZCByZXBhY2sgdG8gaW5zZXJ0IGxlbmd0aCBwcmVmaXhcclxuICAgIGkgPSB2O1xyXG4gICAgaWYgKHZlcnNpb24gPiA5KSB7XHJcbiAgICAgIHN0cmluYnVmW2kgKyAyXSA9IDA7XHJcbiAgICAgIHN0cmluYnVmW2kgKyAzXSA9IDA7XHJcbiAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB0ID0gc3RyaW5idWZbaV07XHJcbiAgICAgICAgc3RyaW5idWZbaSArIDNdIHw9IDI1NSAmICh0IDw8IDQpO1xyXG4gICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IHQgPj4gNDtcclxuICAgICAgfVxyXG4gICAgICBzdHJpbmJ1ZlsyXSB8PSAyNTUgJiAodiA8PCA0KTtcclxuICAgICAgc3RyaW5idWZbMV0gPSB2ID4+IDQ7XHJcbiAgICAgIHN0cmluYnVmWzBdID0gMHg0MCB8ICh2ID4+IDEyKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBzdHJpbmJ1ZltpICsgMV0gPSAwO1xyXG4gICAgICBzdHJpbmJ1ZltpICsgMl0gPSAwO1xyXG4gICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdCA9IHN0cmluYnVmW2ldO1xyXG4gICAgICAgIHN0cmluYnVmW2kgKyAyXSB8PSAyNTUgJiAodCA8PCA0KTtcclxuICAgICAgICBzdHJpbmJ1ZltpICsgMV0gPSB0ID4+IDQ7XHJcbiAgICAgIH1cclxuICAgICAgc3RyaW5idWZbMV0gfD0gMjU1ICYgKHYgPDwgNCk7XHJcbiAgICAgIHN0cmluYnVmWzBdID0gMHg0MCB8ICh2ID4+IDQpO1xyXG4gICAgfVxyXG4gICAgLy8gZmlsbCB0byBlbmQgd2l0aCBwYWQgcGF0dGVyblxyXG4gICAgaSA9IHYgKyAzIC0gKHZlcnNpb24gPCAxMCk7XHJcbiAgICB3aGlsZSAoaSA8IHgpIHtcclxuICAgICAgc3RyaW5idWZbaSsrXSA9IDB4ZWM7XHJcbiAgICAgIC8vIGJ1ZmZlciBoYXMgcm9vbSAgICBpZiAoaSA9PSB4KSAgICAgIGJyZWFrO1xyXG4gICAgICBzdHJpbmJ1ZltpKytdID0gMHgxMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgYW5kIGFwcGVuZCBFQ0NcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgZ2VuZXJhdG9yIHBvbHlub21pYWxcclxuICAgIGdlbnBvbHlbMF0gPSAxO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKSB7XHJcbiAgICAgIGdlbnBvbHlbaSArIDFdID0gMTtcclxuICAgICAgZm9yIChqID0gaTsgaiA+IDA7IGotLSlcclxuICAgICAgICBnZW5wb2x5W2pdID0gZ2VucG9seVtqXVxyXG4gICAgICAgICAgPyBnZW5wb2x5W2ogLSAxXSBeIGdleHBbbW9kbm4oZ2xvZ1tnZW5wb2x5W2pdXSArIGkpXSA6IGdlbnBvbHlbaiAtIDFdO1xyXG4gICAgICBnZW5wb2x5WzBdID0gZ2V4cFttb2RubihnbG9nW2dlbnBvbHlbMF1dICsgaSldO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8PSBlY2NibGt3aWQ7IGkrKylcclxuICAgICAgZ2VucG9seVtpXSA9IGdsb2dbZ2VucG9seVtpXV07IC8vIHVzZSBsb2dzIGZvciBnZW5wb2x5W10gdG8gc2F2ZSBjYWxjIHN0ZXBcclxuXHJcbiAgICAvLyBhcHBlbmQgZWNjIHRvIGRhdGEgYnVmZmVyXHJcbiAgICBrID0geDtcclxuICAgIHkgPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG5lY2NibGsxOyBpKyspIHtcclxuICAgICAgYXBwZW5kcnMoeSwgZGF0YWJsa3csIGssIGVjY2Jsa3dpZCk7XHJcbiAgICAgIHkgKz0gZGF0YWJsa3c7XHJcbiAgICAgIGsgKz0gZWNjYmxrd2lkO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IG5lY2NibGsyOyBpKyspIHtcclxuICAgICAgYXBwZW5kcnMoeSwgZGF0YWJsa3cgKyAxLCBrLCBlY2NibGt3aWQpO1xyXG4gICAgICB5ICs9IGRhdGFibGt3ICsgMTtcclxuICAgICAgayArPSBlY2NibGt3aWQ7XHJcbiAgICB9XHJcbiAgICAvLyBpbnRlcmxlYXZlIGJsb2Nrc1xyXG4gICAgeSA9IDA7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YWJsa3c7IGkrKykge1xyXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazE7IGorKylcclxuICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmW2kgKyBqICogZGF0YWJsa3ddO1xyXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazI7IGorKylcclxuICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmWyhuZWNjYmxrMSAqIGRhdGFibGt3KSArIGkgKyAoaiAqIChkYXRhYmxrdyArIDEpKV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazI7IGorKylcclxuICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZlsobmVjY2JsazEgKiBkYXRhYmxrdykgKyBpICsgKGogKiAoZGF0YWJsa3cgKyAxKSldO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKVxyXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazEgKyBuZWNjYmxrMjsgaisrKVxyXG4gICAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbeCArIGkgKyBqICogZWNjYmxrd2lkXTtcclxuICAgIHN0cmluYnVmID0gZWNjYnVmO1xyXG5cclxuICAgIC8vIHBhY2sgYml0cyBpbnRvIGZyYW1lIGF2b2lkaW5nIG1hc2tlZCBhcmVhLlxyXG4gICAgeCA9IHkgPSB3aWR0aCAtIDE7XHJcbiAgICBrID0gdiA9IDE7ICAgICAgICAgLy8gdXAsIG1pbnVzXHJcbiAgICAvKiBpbnRlbGVhdmVkIGRhdGEgYW5kIGVjYyBjb2RlcyAqL1xyXG4gICAgbSA9IChkYXRhYmxrdyArIGVjY2Jsa3dpZCkgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcclxuICAgICAgdCA9IHN0cmluYnVmW2ldO1xyXG4gICAgICBmb3IgKGogPSAwOyBqIDwgODsgaisrICwgdCA8PD0gMSkge1xyXG4gICAgICAgIGlmICgweDgwICYgdClcclxuICAgICAgICAgIHFyZnJhbWVbeCArIHdpZHRoICogeV0gPSAxO1xyXG4gICAgICAgIGRvIHsgICAgICAgIC8vIGZpbmQgbmV4dCBmaWxsIHBvc2l0aW9uXHJcbiAgICAgICAgICBpZiAodilcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHgrKztcclxuICAgICAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgICAgICBpZiAoeSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgeS0tO1xyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeCAtPSAyO1xyXG4gICAgICAgICAgICAgICAgayA9ICFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICB4LS07XHJcbiAgICAgICAgICAgICAgICAgIHkgPSA5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoeSAhPSB3aWR0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICB5Kys7XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4IC09IDI7XHJcbiAgICAgICAgICAgICAgICBrID0gIWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgIHgtLTtcclxuICAgICAgICAgICAgICAgICAgeSAtPSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdiA9ICF2O1xyXG4gICAgICAgIH0gd2hpbGUgKGlzbWFza2VkKHgsIHkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNhdmUgcHJlLW1hc2sgY29weSBvZiBmcmFtZVxyXG4gICAgc3RyaW5idWYgPSBxcmZyYW1lLnNsaWNlKDApO1xyXG4gICAgdCA9IDA7ICAgICAgICAgICAvLyBiZXN0XHJcbiAgICB5ID0gMzAwMDA7ICAgICAgICAgLy8gZGVtZXJpdFxyXG4gICAgLy8gZm9yIGluc3RlYWQgb2Ygd2hpbGUgc2luY2UgaW4gb3JpZ2luYWwgYXJkdWlubyBjb2RlXHJcbiAgICAvLyBpZiBhbiBlYXJseSBtYXNrIHdhcyBcImdvb2QgZW5vdWdoXCIgaXQgd291bGRuJ3QgdHJ5IGZvciBhIGJldHRlciBvbmVcclxuICAgIC8vIHNpbmNlIHRoZXkgZ2V0IG1vcmUgY29tcGxleCBhbmQgdGFrZSBsb25nZXIuXHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgIGFwcGx5bWFzayhrKTsgICAgICAvLyByZXR1cm5zIGJsYWNrLXdoaXRlIGltYmFsYW5jZVxyXG4gICAgICB4ID0gYmFkY2hlY2soKTtcclxuICAgICAgaWYgKHggPCB5KSB7IC8vIGN1cnJlbnQgbWFzayBiZXR0ZXIgdGhhbiBwcmV2aW91cyBiZXN0P1xyXG4gICAgICAgIHkgPSB4O1xyXG4gICAgICAgIHQgPSBrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0ID09IDcpXHJcbiAgICAgICAgYnJlYWs7ICAgICAgIC8vIGRvbid0IGluY3JlbWVudCBpIHRvIGEgdm9pZCByZWRvaW5nIG1hc2tcclxuICAgICAgcXJmcmFtZSA9IHN0cmluYnVmLnNsaWNlKDApOyAvLyByZXNldCBmb3IgbmV4dCBwYXNzXHJcbiAgICB9XHJcbiAgICBpZiAodCAhPSBrKSAgICAgICAgIC8vIHJlZG8gYmVzdCBtYXNrIC0gbm9uZSBnb29kIGVub3VnaCwgbGFzdCB3YXNuJ3QgdFxyXG4gICAgICBhcHBseW1hc2sodCk7XHJcblxyXG4gICAgLy8gYWRkIGluIGZpbmFsIG1hc2svZWNjbGV2ZWwgYnl0ZXNcclxuICAgIHkgPSBmbXR3b3JkW3QgKyAoKGVjY2xldmVsIC0gMSkgPDwgMyldO1xyXG4gICAgLy8gbG93IGJ5dGVcclxuICAgIGZvciAoayA9IDA7IGsgPCA4OyBrKysgLCB5ID4+PSAxKVxyXG4gICAgICBpZiAoeSAmIDEpIHtcclxuICAgICAgICBxcmZyYW1lWyh3aWR0aCAtIDEgLSBrKSArIHdpZHRoICogOF0gPSAxO1xyXG4gICAgICAgIGlmIChrIDwgNilcclxuICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICoga10gPSAxO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICogKGsgKyAxKV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICAvLyBoaWdoIGJ5dGVcclxuICAgIGZvciAoayA9IDA7IGsgPCA3OyBrKysgLCB5ID4+PSAxKVxyXG4gICAgICBpZiAoeSAmIDEpIHtcclxuICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqICh3aWR0aCAtIDcgKyBrKV0gPSAxO1xyXG4gICAgICAgIGlmIChrKVxyXG4gICAgICAgICAgcXJmcmFtZVsoNiAtIGspICsgd2lkdGggKiA4XSA9IDE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgcXJmcmFtZVs3ICsgd2lkdGggKiA4XSA9IDE7XHJcbiAgICAgIH1cclxuICAgIHJldHVybiBxcmZyYW1lO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgdmFyIF9jYW52YXMgPSBudWxsO1xyXG5cclxuICB2YXIgYXBpID0ge1xyXG5cclxuICAgIGdldCBlY2NsZXZlbCgpIHtcclxuICAgICAgcmV0dXJuIGVjY2xldmVsO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQgZWNjbGV2ZWwodmFsKSB7XHJcbiAgICAgIGVjY2xldmVsID0gdmFsO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQgc2l6ZSgpIHtcclxuICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQgc2l6ZSh2YWwpIHtcclxuICAgICAgX3NpemUgPSB2YWxcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IGNhbnZhcygpIHtcclxuICAgICAgcmV0dXJuIF9jYW52YXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldCBjYW52YXMoZWwpIHtcclxuICAgICAgX2NhbnZhcyA9IGVsO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRGcmFtZTogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgICByZXR1cm4gZ2VuZnJhbWUoc3RyaW5nKTtcclxuICAgIH0sXHJcbiAgICAvL+i/memHjOeahHV0ZjE2dG84KHN0cinmmK/lr7lUZXh05Lit55qE5a2X56ym5Liy6L+b6KGM6L2s56CB77yM6K6p5YW25pSv5oyB5Lit5paHXHJcbiAgICB1dGYxNnRvODogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICB2YXIgb3V0LCBpLCBsZW4sIGM7XHJcblxyXG4gICAgICBvdXQgPSBcIlwiO1xyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKChjID49IDB4MDAwMSkgJiYgKGMgPD0gMHgwMDdGKSkge1xyXG4gICAgICAgICAgb3V0ICs9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjID4gMHgwN0ZGKSB7XHJcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweEUwIHwgKChjID4+IDEyKSAmIDB4MEYpKTtcclxuICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ODAgfCAoKGMgPj4gNikgJiAweDNGKSk7XHJcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDgwIHwgKChjID4+IDApICYgMHgzRikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweEMwIHwgKChjID4+IDYpICYgMHgxRikpO1xyXG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHg4MCB8ICgoYyA+PiAwKSAmIDB4M0YpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgZHJhdzogZnVuY3Rpb24gKHN0ciwgY2FudmFzLCBjYXZXLCBjYXZILCBlY2MpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBlY2NsZXZlbCA9IGVjYyB8fCBlY2NsZXZlbDtcclxuICAgICAgY2FudmFzID0gY2FudmFzIHx8IF9jYW52YXM7XHJcbiAgICAgIGlmICghY2FudmFzKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdObyBjYW52YXMgcHJvdmlkZWQgdG8gZHJhdyBRUiBjb2RlIGluIScpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2l6ZSA9IE1hdGgubWluKGNhdlcsIGNhdkgpO1xyXG4gICAgICBzdHIgPSB0aGF0LnV0ZjE2dG84KHN0cik7Ly/lop7liqDkuK3mlofmmL7npLpcclxuXHJcbiAgICAgIHZhciBmcmFtZSA9IHRoYXQuZ2V0RnJhbWUoc3RyKSxcclxuICAgICAgICBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyksXHJcbiAgICAgICAgcHggPSBNYXRoLnJvdW5kKHNpemUgLyAod2lkdGggKyA4KSk7XHJcbiAgICAgIHZhciByb3VuZGVkU2l6ZSA9IHB4ICogKHdpZHRoICsgOCksXHJcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5mbG9vcigoc2l6ZSAtIHJvdW5kZWRTaXplKSAvIDIpO1xyXG4gICAgICBzaXplID0gcm91bmRlZFNpemU7XHJcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyNmZmZmZmYnKVxyXG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2F2VywgY2F2Vyk7XHJcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAwMDAnKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoZnJhbWVbaiAqIHdpZHRoICsgaV0pIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHB4ICogKDQgKyBpKSArIG9mZnNldCwgcHggKiAoNCArIGopICsgb2Zmc2V0LCBweCwgcHgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjdHguZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBtb2R1bGUuZXhwb3J0cyA9IHsgYXBpIH1cclxuXHJcbn0pKCk7Il19