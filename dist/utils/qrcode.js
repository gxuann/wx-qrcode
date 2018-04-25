"use strict";

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
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
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
    base64encode: function base64encode(str) {
      var out, i, len;
      var c1, c2, c3;
      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
          out += base64EncodeChars.charAt((c2 & 0xF) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
        out += base64EncodeChars.charAt(c3 & 0x3F);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJhZGVsdGEiLCJ2cGF0IiwiZm10d29yZCIsImVjY2Jsb2NrcyIsImdsb2ciLCJnZXhwIiwiYmFzZTY0RW5jb2RlQ2hhcnMiLCJiYXNlNjREZWNvZGVDaGFycyIsIkFycmF5Iiwic3RyaW5idWYiLCJlY2NidWYiLCJxcmZyYW1lIiwiZnJhbWFzayIsInJsZW5zIiwidmVyc2lvbiIsIndpZHRoIiwibmVjY2JsazEiLCJuZWNjYmxrMiIsImRhdGFibGt3IiwiZWNjYmxrd2lkIiwiZWNjbGV2ZWwiLCJzZXRtYXNrIiwieCIsInkiLCJidCIsInB1dGFsaWduIiwiaiIsIm1vZG5uIiwiZ2VucG9seSIsImFwcGVuZHJzIiwiZGF0YSIsImRsZW4iLCJlY2J1ZiIsImVjbGVuIiwiaSIsImZiIiwiaXNtYXNrZWQiLCJhcHBseW1hc2siLCJtIiwicjN4IiwicjN5IiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJiYWRydW5zIiwibGVuZ3RoIiwicnVuc2JhZCIsImJhZGNoZWNrIiwiaCIsImIiLCJiMSIsInRoaXNiYWQiLCJidyIsImJpZyIsImNvdW50IiwiZ2VuZnJhbWUiLCJpbnN0cmluZyIsImsiLCJ0IiwidiIsInNsaWNlIiwiY2hhckNvZGVBdCIsIl9jYW52YXMiLCJhcGkiLCJ2YWwiLCJzaXplIiwiX3NpemUiLCJjYW52YXMiLCJlbCIsImdldEZyYW1lIiwic3RyaW5nIiwidXRmMTZ0bzgiLCJzdHIiLCJvdXQiLCJsZW4iLCJjIiwiY2hhckF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYmFzZTY0ZW5jb2RlIiwiYzEiLCJjMiIsImMzIiwiZHJhdyIsImNhdlciLCJjYXZIIiwiZWNjIiwidGhhdCIsImNvbnNvbGUiLCJ3YXJuIiwiTWF0aCIsIm1pbiIsImZyYW1lIiwiY3R4Iiwid3giLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicHgiLCJyb3VuZCIsInJvdW5kZWRTaXplIiwib2Zmc2V0IiwiZmxvb3IiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBRSxZQUFZOztBQUVaO0FBQ0EsTUFBSUEsU0FBUyxDQUNYLENBRFcsRUFDUixFQURRLEVBQ0osRUFESSxFQUNBLEVBREEsRUFDSSxFQURKLEVBQ1EsRUFEUixFQUNZLEVBRFosRUFFWCxFQUZXLEVBRVAsRUFGTyxFQUVILEVBRkcsRUFFQyxFQUZELEVBRUssRUFGTCxFQUVTLEVBRlQsRUFFYSxFQUZiLEVBRWlCLEVBRmpCLEVBRXFCLEVBRnJCLEVBRXlCLEVBRnpCLEVBRTZCLEVBRjdCLEVBRWlDLEVBRmpDLEVBRXFDLEVBRnJDLEVBRXlDLEVBRnpDLEVBRTZDLEVBRjdDLEVBRWlELEVBRmpELEVBRXFELEVBRnJELEVBR1gsRUFIVyxFQUdQLEVBSE8sRUFHSCxFQUhHLEVBR0MsRUFIRCxFQUdLLEVBSEwsRUFHUyxFQUhULEVBR2EsRUFIYixFQUdpQixFQUhqQixFQUdxQixFQUhyQixFQUd5QixFQUh6QixFQUc2QixFQUg3QixFQUdpQyxFQUhqQyxFQUdxQyxFQUhyQyxFQUd5QyxFQUh6QyxFQUc2QyxFQUg3QyxFQUdpRCxFQUhqRCxFQUdxRCxFQUhyRCxDQUFiOztBQU1BO0FBQ0EsTUFBSUMsT0FBTyxDQUNULEtBRFMsRUFDRixLQURFLEVBQ0ssS0FETCxFQUNZLEtBRFosRUFDbUIsS0FEbkIsRUFDMEIsS0FEMUIsRUFDaUMsS0FEakMsRUFDd0MsS0FEeEMsRUFFVCxLQUZTLEVBRUYsS0FGRSxFQUVLLEtBRkwsRUFFWSxLQUZaLEVBRW1CLEtBRm5CLEVBRTBCLEtBRjFCLEVBRWlDLEtBRmpDLEVBRXdDLEtBRnhDLEVBR1QsS0FIUyxFQUdGLEtBSEUsRUFHSyxLQUhMLEVBR1ksS0FIWixFQUdtQixLQUhuQixFQUcwQixLQUgxQixFQUdpQyxLQUhqQyxFQUd3QyxLQUh4QyxFQUlULEtBSlMsRUFJRixLQUpFLEVBSUssS0FKTCxFQUlZLEtBSlosRUFJbUIsS0FKbkIsRUFJMEIsS0FKMUIsRUFJaUMsS0FKakMsRUFJd0MsS0FKeEMsRUFLVCxLQUxTLEVBS0YsS0FMRSxDQUFYOztBQVFBO0FBQ0EsTUFBSUMsVUFBVSxDQUNaLE1BRFksRUFDSixNQURJLEVBQ0ksTUFESixFQUNZLE1BRFosRUFDb0IsTUFEcEIsRUFDNEIsTUFENUIsRUFDb0MsTUFEcEMsRUFDNEMsTUFENUMsRUFDdUQ7QUFDbkUsUUFGWSxFQUVKLE1BRkksRUFFSSxNQUZKLEVBRVksTUFGWixFQUVvQixNQUZwQixFQUU0QixNQUY1QixFQUVvQyxNQUZwQyxFQUU0QyxNQUY1QyxFQUV1RDtBQUNuRSxRQUhZLEVBR0osTUFISSxFQUdJLE1BSEosRUFHWSxNQUhaLEVBR29CLE1BSHBCLEVBRzRCLE1BSDVCLEVBR29DLE1BSHBDLEVBRzRDLE1BSDVDLEVBR3VEO0FBQ25FLFFBSlksRUFJSixNQUpJLEVBSUksTUFKSixFQUlZLE1BSlosRUFJb0IsTUFKcEIsRUFJNEIsTUFKNUIsRUFJb0MsTUFKcEMsRUFJNEMsTUFKNUMsQ0FJc0Q7QUFKdEQsR0FBZDs7QUFPQTtBQUNBLE1BQUlDLFlBQVksQ0FDZCxDQURjLEVBQ1gsQ0FEVyxFQUNSLEVBRFEsRUFDSixDQURJLEVBQ0QsQ0FEQyxFQUNFLENBREYsRUFDSyxFQURMLEVBQ1MsRUFEVCxFQUNhLENBRGIsRUFDZ0IsQ0FEaEIsRUFDbUIsRUFEbkIsRUFDdUIsRUFEdkIsRUFDMkIsQ0FEM0IsRUFDOEIsQ0FEOUIsRUFDaUMsQ0FEakMsRUFDb0MsRUFEcEMsRUFFZCxDQUZjLEVBRVgsQ0FGVyxFQUVSLEVBRlEsRUFFSixFQUZJLEVBRUEsQ0FGQSxFQUVHLENBRkgsRUFFTSxFQUZOLEVBRVUsRUFGVixFQUVjLENBRmQsRUFFaUIsQ0FGakIsRUFFb0IsRUFGcEIsRUFFd0IsRUFGeEIsRUFFNEIsQ0FGNUIsRUFFK0IsQ0FGL0IsRUFFa0MsRUFGbEMsRUFFc0MsRUFGdEMsRUFHZCxDQUhjLEVBR1gsQ0FIVyxFQUdSLEVBSFEsRUFHSixFQUhJLEVBR0EsQ0FIQSxFQUdHLENBSEgsRUFHTSxFQUhOLEVBR1UsRUFIVixFQUdjLENBSGQsRUFHaUIsQ0FIakIsRUFHb0IsRUFIcEIsRUFHd0IsRUFIeEIsRUFHNEIsQ0FINUIsRUFHK0IsQ0FIL0IsRUFHa0MsRUFIbEMsRUFHc0MsRUFIdEMsRUFJZCxDQUpjLEVBSVgsQ0FKVyxFQUlSLEVBSlEsRUFJSixFQUpJLEVBSUEsQ0FKQSxFQUlHLENBSkgsRUFJTSxFQUpOLEVBSVUsRUFKVixFQUljLENBSmQsRUFJaUIsQ0FKakIsRUFJb0IsRUFKcEIsRUFJd0IsRUFKeEIsRUFJNEIsQ0FKNUIsRUFJK0IsQ0FKL0IsRUFJa0MsQ0FKbEMsRUFJcUMsRUFKckMsRUFLZCxDQUxjLEVBS1gsQ0FMVyxFQUtSLEdBTFEsRUFLSCxFQUxHLEVBS0MsQ0FMRCxFQUtJLENBTEosRUFLTyxFQUxQLEVBS1csRUFMWCxFQUtlLENBTGYsRUFLa0IsQ0FMbEIsRUFLcUIsRUFMckIsRUFLeUIsRUFMekIsRUFLNkIsQ0FMN0IsRUFLZ0MsQ0FMaEMsRUFLbUMsRUFMbkMsRUFLdUMsRUFMdkMsRUFNZCxDQU5jLEVBTVgsQ0FOVyxFQU1SLEVBTlEsRUFNSixFQU5JLEVBTUEsQ0FOQSxFQU1HLENBTkgsRUFNTSxFQU5OLEVBTVUsRUFOVixFQU1jLENBTmQsRUFNaUIsQ0FOakIsRUFNb0IsRUFOcEIsRUFNd0IsRUFOeEIsRUFNNEIsQ0FONUIsRUFNK0IsQ0FOL0IsRUFNa0MsRUFObEMsRUFNc0MsRUFOdEMsRUFPZCxDQVBjLEVBT1gsQ0FQVyxFQU9SLEVBUFEsRUFPSixFQVBJLEVBT0EsQ0FQQSxFQU9HLENBUEgsRUFPTSxFQVBOLEVBT1UsRUFQVixFQU9jLENBUGQsRUFPaUIsQ0FQakIsRUFPb0IsRUFQcEIsRUFPd0IsRUFQeEIsRUFPNEIsQ0FQNUIsRUFPK0IsQ0FQL0IsRUFPa0MsRUFQbEMsRUFPc0MsRUFQdEMsRUFRZCxDQVJjLEVBUVgsQ0FSVyxFQVFSLEVBUlEsRUFRSixFQVJJLEVBUUEsQ0FSQSxFQVFHLENBUkgsRUFRTSxFQVJOLEVBUVUsRUFSVixFQVFjLENBUmQsRUFRaUIsQ0FSakIsRUFRb0IsRUFScEIsRUFRd0IsRUFSeEIsRUFRNEIsQ0FSNUIsRUFRK0IsQ0FSL0IsRUFRa0MsRUFSbEMsRUFRc0MsRUFSdEMsRUFTZCxDQVRjLEVBU1gsQ0FUVyxFQVNSLEdBVFEsRUFTSCxFQVRHLEVBU0MsQ0FURCxFQVNJLENBVEosRUFTTyxFQVRQLEVBU1csRUFUWCxFQVNlLENBVGYsRUFTa0IsQ0FUbEIsRUFTcUIsRUFUckIsRUFTeUIsRUFUekIsRUFTNkIsQ0FUN0IsRUFTZ0MsQ0FUaEMsRUFTbUMsRUFUbkMsRUFTdUMsRUFUdkMsRUFVZCxDQVZjLEVBVVgsQ0FWVyxFQVVSLEVBVlEsRUFVSixFQVZJLEVBVUEsQ0FWQSxFQVVHLENBVkgsRUFVTSxFQVZOLEVBVVUsRUFWVixFQVVjLENBVmQsRUFVaUIsQ0FWakIsRUFVb0IsRUFWcEIsRUFVd0IsRUFWeEIsRUFVNEIsQ0FWNUIsRUFVK0IsQ0FWL0IsRUFVa0MsRUFWbEMsRUFVc0MsRUFWdEMsRUFXZCxDQVhjLEVBV1gsQ0FYVyxFQVdSLEVBWFEsRUFXSixFQVhJLEVBV0EsQ0FYQSxFQVdHLENBWEgsRUFXTSxFQVhOLEVBV1UsRUFYVixFQVdjLENBWGQsRUFXaUIsQ0FYakIsRUFXb0IsRUFYcEIsRUFXd0IsRUFYeEIsRUFXNEIsQ0FYNUIsRUFXK0IsQ0FYL0IsRUFXa0MsRUFYbEMsRUFXc0MsRUFYdEMsRUFZZCxDQVpjLEVBWVgsQ0FaVyxFQVlSLEVBWlEsRUFZSixFQVpJLEVBWUEsQ0FaQSxFQVlHLENBWkgsRUFZTSxFQVpOLEVBWVUsRUFaVixFQVljLENBWmQsRUFZaUIsQ0FaakIsRUFZb0IsRUFacEIsRUFZd0IsRUFaeEIsRUFZNEIsQ0FaNUIsRUFZK0IsQ0FaL0IsRUFZa0MsRUFabEMsRUFZc0MsRUFadEMsRUFhZCxDQWJjLEVBYVgsQ0FiVyxFQWFSLEdBYlEsRUFhSCxFQWJHLEVBYUMsQ0FiRCxFQWFJLENBYkosRUFhTyxFQWJQLEVBYVcsRUFiWCxFQWFlLENBYmYsRUFha0IsQ0FibEIsRUFhcUIsRUFickIsRUFheUIsRUFiekIsRUFhNkIsRUFiN0IsRUFhaUMsQ0FiakMsRUFhb0MsRUFicEMsRUFhd0MsRUFieEMsRUFjZCxDQWRjLEVBY1gsQ0FkVyxFQWNSLEdBZFEsRUFjSCxFQWRHLEVBY0MsQ0FkRCxFQWNJLENBZEosRUFjTyxFQWRQLEVBY1csRUFkWCxFQWNlLEVBZGYsRUFjbUIsQ0FkbkIsRUFjc0IsRUFkdEIsRUFjMEIsRUFkMUIsRUFjOEIsRUFkOUIsRUFja0MsQ0FkbEMsRUFjcUMsRUFkckMsRUFjeUMsRUFkekMsRUFlZCxDQWZjLEVBZVgsQ0FmVyxFQWVSLEVBZlEsRUFlSixFQWZJLEVBZUEsQ0FmQSxFQWVHLENBZkgsRUFlTSxFQWZOLEVBZVUsRUFmVixFQWVjLENBZmQsRUFlaUIsQ0FmakIsRUFlb0IsRUFmcEIsRUFld0IsRUFmeEIsRUFlNEIsRUFmNUIsRUFlZ0MsQ0FmaEMsRUFlbUMsRUFmbkMsRUFldUMsRUFmdkMsRUFnQmQsQ0FoQmMsRUFnQlgsQ0FoQlcsRUFnQlIsRUFoQlEsRUFnQkosRUFoQkksRUFnQkEsQ0FoQkEsRUFnQkcsQ0FoQkgsRUFnQk0sRUFoQk4sRUFnQlUsRUFoQlYsRUFnQmMsRUFoQmQsRUFnQmtCLENBaEJsQixFQWdCcUIsRUFoQnJCLEVBZ0J5QixFQWhCekIsRUFnQjZCLENBaEI3QixFQWdCZ0MsRUFoQmhDLEVBZ0JvQyxFQWhCcEMsRUFnQndDLEVBaEJ4QyxFQWlCZCxDQWpCYyxFQWlCWCxDQWpCVyxFQWlCUixHQWpCUSxFQWlCSCxFQWpCRyxFQWlCQyxFQWpCRCxFQWlCSyxDQWpCTCxFQWlCUSxFQWpCUixFQWlCWSxFQWpCWixFQWlCZ0IsQ0FqQmhCLEVBaUJtQixFQWpCbkIsRUFpQnVCLEVBakJ2QixFQWlCMkIsRUFqQjNCLEVBaUIrQixDQWpCL0IsRUFpQmtDLEVBakJsQyxFQWlCc0MsRUFqQnRDLEVBaUIwQyxFQWpCMUMsRUFrQmQsQ0FsQmMsRUFrQlgsQ0FsQlcsRUFrQlIsR0FsQlEsRUFrQkgsRUFsQkcsRUFrQkMsQ0FsQkQsRUFrQkksQ0FsQkosRUFrQk8sRUFsQlAsRUFrQlcsRUFsQlgsRUFrQmUsRUFsQmYsRUFrQm1CLENBbEJuQixFQWtCc0IsRUFsQnRCLEVBa0IwQixFQWxCMUIsRUFrQjhCLENBbEI5QixFQWtCaUMsRUFsQmpDLEVBa0JxQyxFQWxCckMsRUFrQnlDLEVBbEJ6QyxFQW1CZCxDQW5CYyxFQW1CWCxDQW5CVyxFQW1CUixHQW5CUSxFQW1CSCxFQW5CRyxFQW1CQyxDQW5CRCxFQW1CSSxFQW5CSixFQW1CUSxFQW5CUixFQW1CWSxFQW5CWixFQW1CZ0IsRUFuQmhCLEVBbUJvQixDQW5CcEIsRUFtQnVCLEVBbkJ2QixFQW1CMkIsRUFuQjNCLEVBbUIrQixDQW5CL0IsRUFtQmtDLEVBbkJsQyxFQW1Cc0MsRUFuQnRDLEVBbUIwQyxFQW5CMUMsRUFvQmQsQ0FwQmMsRUFvQlgsQ0FwQlcsRUFvQlIsR0FwQlEsRUFvQkgsRUFwQkcsRUFvQkMsQ0FwQkQsRUFvQkksRUFwQkosRUFvQlEsRUFwQlIsRUFvQlksRUFwQlosRUFvQmdCLEVBcEJoQixFQW9Cb0IsQ0FwQnBCLEVBb0J1QixFQXBCdkIsRUFvQjJCLEVBcEIzQixFQW9CK0IsRUFwQi9CLEVBb0JtQyxFQXBCbkMsRUFvQnVDLEVBcEJ2QyxFQW9CMkMsRUFwQjNDLEVBcUJkLENBckJjLEVBcUJYLENBckJXLEVBcUJSLEdBckJRLEVBcUJILEVBckJHLEVBcUJDLEVBckJELEVBcUJLLENBckJMLEVBcUJRLEVBckJSLEVBcUJZLEVBckJaLEVBcUJnQixFQXJCaEIsRUFxQm9CLENBckJwQixFQXFCdUIsRUFyQnZCLEVBcUIyQixFQXJCM0IsRUFxQitCLEVBckIvQixFQXFCbUMsQ0FyQm5DLEVBcUJzQyxFQXJCdEMsRUFxQjBDLEVBckIxQyxFQXNCZCxDQXRCYyxFQXNCWCxDQXRCVyxFQXNCUixHQXRCUSxFQXNCSCxFQXRCRyxFQXNCQyxFQXRCRCxFQXNCSyxDQXRCTCxFQXNCUSxFQXRCUixFQXNCWSxFQXRCWixFQXNCZ0IsQ0F0QmhCLEVBc0JtQixFQXRCbkIsRUFzQnVCLEVBdEJ2QixFQXNCMkIsRUF0QjNCLEVBc0IrQixFQXRCL0IsRUFzQm1DLENBdEJuQyxFQXNCc0MsRUF0QnRDLEVBc0IwQyxFQXRCMUMsRUF1QmQsQ0F2QmMsRUF1QlgsQ0F2QlcsRUF1QlIsR0F2QlEsRUF1QkgsRUF2QkcsRUF1QkMsQ0F2QkQsRUF1QkksRUF2QkosRUF1QlEsRUF2QlIsRUF1QlksRUF2QlosRUF1QmdCLEVBdkJoQixFQXVCb0IsRUF2QnBCLEVBdUJ3QixFQXZCeEIsRUF1QjRCLEVBdkI1QixFQXVCZ0MsRUF2QmhDLEVBdUJvQyxFQXZCcEMsRUF1QndDLEVBdkJ4QyxFQXVCNEMsRUF2QjVDLEVBd0JkLENBeEJjLEVBd0JYLENBeEJXLEVBd0JSLEdBeEJRLEVBd0JILEVBeEJHLEVBd0JDLENBeEJELEVBd0JJLEVBeEJKLEVBd0JRLEVBeEJSLEVBd0JZLEVBeEJaLEVBd0JnQixFQXhCaEIsRUF3Qm9CLEVBeEJwQixFQXdCd0IsRUF4QnhCLEVBd0I0QixFQXhCNUIsRUF3QmdDLEVBeEJoQyxFQXdCb0MsQ0F4QnBDLEVBd0J1QyxFQXhCdkMsRUF3QjJDLEVBeEIzQyxFQXlCZCxDQXpCYyxFQXlCWCxDQXpCVyxFQXlCUixHQXpCUSxFQXlCSCxFQXpCRyxFQXlCQyxDQXpCRCxFQXlCSSxFQXpCSixFQXlCUSxFQXpCUixFQXlCWSxFQXpCWixFQXlCZ0IsQ0F6QmhCLEVBeUJtQixFQXpCbkIsRUF5QnVCLEVBekJ2QixFQXlCMkIsRUF6QjNCLEVBeUIrQixFQXpCL0IsRUF5Qm1DLEVBekJuQyxFQXlCdUMsRUF6QnZDLEVBeUIyQyxFQXpCM0MsRUEwQmQsRUExQmMsRUEwQlYsQ0ExQlUsRUEwQlAsR0ExQk8sRUEwQkYsRUExQkUsRUEwQkUsRUExQkYsRUEwQk0sQ0ExQk4sRUEwQlMsRUExQlQsRUEwQmEsRUExQmIsRUEwQmlCLEVBMUJqQixFQTBCcUIsQ0ExQnJCLEVBMEJ3QixFQTFCeEIsRUEwQjRCLEVBMUI1QixFQTBCZ0MsRUExQmhDLEVBMEJvQyxDQTFCcEMsRUEwQnVDLEVBMUJ2QyxFQTBCMkMsRUExQjNDLEVBMkJkLENBM0JjLEVBMkJYLENBM0JXLEVBMkJSLEdBM0JRLEVBMkJILEVBM0JHLEVBMkJDLEVBM0JELEVBMkJLLENBM0JMLEVBMkJRLEVBM0JSLEVBMkJZLEVBM0JaLEVBMkJnQixDQTNCaEIsRUEyQm1CLEVBM0JuQixFQTJCdUIsRUEzQnZCLEVBMkIyQixFQTNCM0IsRUEyQitCLEVBM0IvQixFQTJCbUMsRUEzQm5DLEVBMkJ1QyxFQTNCdkMsRUEyQjJDLEVBM0IzQyxFQTRCZCxDQTVCYyxFQTRCWCxFQTVCVyxFQTRCUCxHQTVCTyxFQTRCRixFQTVCRSxFQTRCRSxDQTVCRixFQTRCSyxFQTVCTCxFQTRCUyxFQTVCVCxFQTRCYSxFQTVCYixFQTRCaUIsQ0E1QmpCLEVBNEJvQixFQTVCcEIsRUE0QndCLEVBNUJ4QixFQTRCNEIsRUE1QjVCLEVBNEJnQyxFQTVCaEMsRUE0Qm9DLEVBNUJwQyxFQTRCd0MsRUE1QnhDLEVBNEI0QyxFQTVCNUMsRUE2QmQsQ0E3QmMsRUE2QlgsQ0E3QlcsRUE2QlIsR0E3QlEsRUE2QkgsRUE3QkcsRUE2QkMsRUE3QkQsRUE2QkssQ0E3QkwsRUE2QlEsRUE3QlIsRUE2QlksRUE3QlosRUE2QmdCLENBN0JoQixFQTZCbUIsRUE3Qm5CLEVBNkJ1QixFQTdCdkIsRUE2QjJCLEVBN0IzQixFQTZCK0IsRUE3Qi9CLEVBNkJtQyxFQTdCbkMsRUE2QnVDLEVBN0J2QyxFQTZCMkMsRUE3QjNDLEVBOEJkLENBOUJjLEVBOEJYLEVBOUJXLEVBOEJQLEdBOUJPLEVBOEJGLEVBOUJFLEVBOEJFLEVBOUJGLEVBOEJNLEVBOUJOLEVBOEJVLEVBOUJWLEVBOEJjLEVBOUJkLEVBOEJrQixFQTlCbEIsRUE4QnNCLEVBOUJ0QixFQThCMEIsRUE5QjFCLEVBOEI4QixFQTlCOUIsRUE4QmtDLEVBOUJsQyxFQThCc0MsRUE5QnRDLEVBOEIwQyxFQTlCMUMsRUE4QjhDLEVBOUI5QyxFQStCZCxFQS9CYyxFQStCVixDQS9CVSxFQStCUCxHQS9CTyxFQStCRixFQS9CRSxFQStCRSxDQS9CRixFQStCSyxFQS9CTCxFQStCUyxFQS9CVCxFQStCYSxFQS9CYixFQStCaUIsRUEvQmpCLEVBK0JxQixDQS9CckIsRUErQndCLEVBL0J4QixFQStCNEIsRUEvQjVCLEVBK0JnQyxFQS9CaEMsRUErQm9DLEVBL0JwQyxFQStCd0MsRUEvQnhDLEVBK0I0QyxFQS9CNUMsRUFnQ2QsRUFoQ2MsRUFnQ1YsQ0FoQ1UsRUFnQ1AsR0FoQ08sRUFnQ0YsRUFoQ0UsRUFnQ0UsRUFoQ0YsRUFnQ00sRUFoQ04sRUFnQ1UsRUFoQ1YsRUFnQ2MsRUFoQ2QsRUFnQ2tCLEVBaENsQixFQWdDc0IsRUFoQ3RCLEVBZ0MwQixFQWhDMUIsRUFnQzhCLEVBaEM5QixFQWdDa0MsRUFoQ2xDLEVBZ0NzQyxFQWhDdEMsRUFnQzBDLEVBaEMxQyxFQWdDOEMsRUFoQzlDLEVBaUNkLEVBakNjLEVBaUNWLENBakNVLEVBaUNQLEdBakNPLEVBaUNGLEVBakNFLEVBaUNFLEVBakNGLEVBaUNNLEVBakNOLEVBaUNVLEVBakNWLEVBaUNjLEVBakNkLEVBaUNrQixFQWpDbEIsRUFpQ3NCLEVBakN0QixFQWlDMEIsRUFqQzFCLEVBaUM4QixFQWpDOUIsRUFpQ2tDLEVBakNsQyxFQWlDc0MsRUFqQ3RDLEVBaUMwQyxFQWpDMUMsRUFpQzhDLEVBakM5QyxFQWtDZCxFQWxDYyxFQWtDVixDQWxDVSxFQWtDUCxHQWxDTyxFQWtDRixFQWxDRSxFQWtDRSxFQWxDRixFQWtDTSxFQWxDTixFQWtDVSxFQWxDVixFQWtDYyxFQWxDZCxFQWtDa0IsRUFsQ2xCLEVBa0NzQixDQWxDdEIsRUFrQ3lCLEVBbEN6QixFQWtDNkIsRUFsQzdCLEVBa0NpQyxFQWxDakMsRUFrQ3FDLENBbENyQyxFQWtDd0MsRUFsQ3hDLEVBa0M0QyxFQWxDNUMsRUFtQ2QsRUFuQ2MsRUFtQ1YsQ0FuQ1UsRUFtQ1AsR0FuQ08sRUFtQ0YsRUFuQ0UsRUFtQ0UsRUFuQ0YsRUFtQ00sRUFuQ04sRUFtQ1UsRUFuQ1YsRUFtQ2MsRUFuQ2QsRUFtQ2tCLEVBbkNsQixFQW1Dc0IsRUFuQ3RCLEVBbUMwQixFQW5DMUIsRUFtQzhCLEVBbkM5QixFQW1Da0MsRUFuQ2xDLEVBbUNzQyxFQW5DdEMsRUFtQzBDLEVBbkMxQyxFQW1DOEMsRUFuQzlDLEVBb0NkLENBcENjLEVBb0NYLEVBcENXLEVBb0NQLEdBcENPLEVBb0NGLEVBcENFLEVBb0NFLENBcENGLEVBb0NLLEVBcENMLEVBb0NTLEVBcENULEVBb0NhLEVBcENiLEVBb0NpQixFQXBDakIsRUFvQ3FCLEVBcENyQixFQW9DeUIsRUFwQ3pCLEVBb0M2QixFQXBDN0IsRUFvQ2lDLENBcENqQyxFQW9Db0MsRUFwQ3BDLEVBb0N3QyxFQXBDeEMsRUFvQzRDLEVBcEM1QyxFQXFDZCxFQXJDYyxFQXFDVixDQXJDVSxFQXFDUCxHQXJDTyxFQXFDRixFQXJDRSxFQXFDRSxFQXJDRixFQXFDTSxFQXJDTixFQXFDVSxFQXJDVixFQXFDYyxFQXJDZCxFQXFDa0IsRUFyQ2xCLEVBcUNzQixFQXJDdEIsRUFxQzBCLEVBckMxQixFQXFDOEIsRUFyQzlCLEVBcUNrQyxFQXJDbEMsRUFxQ3NDLEVBckN0QyxFQXFDMEMsRUFyQzFDLEVBcUM4QyxFQXJDOUMsRUFzQ2QsQ0F0Q2MsRUFzQ1gsRUF0Q1csRUFzQ1AsR0F0Q08sRUFzQ0YsRUF0Q0UsRUFzQ0UsRUF0Q0YsRUFzQ00sRUF0Q04sRUFzQ1UsRUF0Q1YsRUFzQ2MsRUF0Q2QsRUFzQ2tCLEVBdENsQixFQXNDc0IsRUF0Q3RCLEVBc0MwQixFQXRDMUIsRUFzQzhCLEVBdEM5QixFQXNDa0MsRUF0Q2xDLEVBc0NzQyxFQXRDdEMsRUFzQzBDLEVBdEMxQyxFQXNDOEMsRUF0QzlDLEVBdUNkLEVBdkNjLEVBdUNWLENBdkNVLEVBdUNQLEdBdkNPLEVBdUNGLEVBdkNFLEVBdUNFLEVBdkNGLEVBdUNNLENBdkNOLEVBdUNTLEVBdkNULEVBdUNhLEVBdkNiLEVBdUNpQixFQXZDakIsRUF1Q3FCLEVBdkNyQixFQXVDeUIsRUF2Q3pCLEVBdUM2QixFQXZDN0IsRUF1Q2lDLEVBdkNqQyxFQXVDcUMsRUF2Q3JDLEVBdUN5QyxFQXZDekMsRUF1QzZDLEVBdkM3QyxFQXdDZCxFQXhDYyxFQXdDVixDQXhDVSxFQXdDUCxHQXhDTyxFQXdDRixFQXhDRSxFQXdDRSxFQXhDRixFQXdDTSxFQXhDTixFQXdDVSxFQXhDVixFQXdDYyxFQXhDZCxFQXdDa0IsRUF4Q2xCLEVBd0NzQixFQXhDdEIsRUF3QzBCLEVBeEMxQixFQXdDOEIsRUF4QzlCLEVBd0NrQyxFQXhDbEMsRUF3Q3NDLEVBeEN0QyxFQXdDMEMsRUF4QzFDLEVBd0M4QyxFQXhDOUMsQ0FBaEI7O0FBMkNBO0FBQ0EsTUFBSUMsT0FBTyxDQUNULElBRFMsRUFDSCxJQURHLEVBQ0csSUFESCxFQUNTLElBRFQsRUFDZSxJQURmLEVBQ3FCLElBRHJCLEVBQzJCLElBRDNCLEVBQ2lDLElBRGpDLEVBQ3VDLElBRHZDLEVBQzZDLElBRDdDLEVBQ21ELElBRG5ELEVBQ3lELElBRHpELEVBQytELElBRC9ELEVBQ3FFLElBRHJFLEVBQzJFLElBRDNFLEVBQ2lGLElBRGpGLEVBRVQsSUFGUyxFQUVILElBRkcsRUFFRyxJQUZILEVBRVMsSUFGVCxFQUVlLElBRmYsRUFFcUIsSUFGckIsRUFFMkIsSUFGM0IsRUFFaUMsSUFGakMsRUFFdUMsSUFGdkMsRUFFNkMsSUFGN0MsRUFFbUQsSUFGbkQsRUFFeUQsSUFGekQsRUFFK0QsSUFGL0QsRUFFcUUsSUFGckUsRUFFMkUsSUFGM0UsRUFFaUYsSUFGakYsRUFHVCxJQUhTLEVBR0gsSUFIRyxFQUdHLElBSEgsRUFHUyxJQUhULEVBR2UsSUFIZixFQUdxQixJQUhyQixFQUcyQixJQUgzQixFQUdpQyxJQUhqQyxFQUd1QyxJQUh2QyxFQUc2QyxJQUg3QyxFQUdtRCxJQUhuRCxFQUd5RCxJQUh6RCxFQUcrRCxJQUgvRCxFQUdxRSxJQUhyRSxFQUcyRSxJQUgzRSxFQUdpRixJQUhqRixFQUlULElBSlMsRUFJSCxJQUpHLEVBSUcsSUFKSCxFQUlTLElBSlQsRUFJZSxJQUpmLEVBSXFCLElBSnJCLEVBSTJCLElBSjNCLEVBSWlDLElBSmpDLEVBSXVDLElBSnZDLEVBSTZDLElBSjdDLEVBSW1ELElBSm5ELEVBSXlELElBSnpELEVBSStELElBSi9ELEVBSXFFLElBSnJFLEVBSTJFLElBSjNFLEVBSWlGLElBSmpGLEVBS1QsSUFMUyxFQUtILElBTEcsRUFLRyxJQUxILEVBS1MsSUFMVCxFQUtlLElBTGYsRUFLcUIsSUFMckIsRUFLMkIsSUFMM0IsRUFLaUMsSUFMakMsRUFLdUMsSUFMdkMsRUFLNkMsSUFMN0MsRUFLbUQsSUFMbkQsRUFLeUQsSUFMekQsRUFLK0QsSUFML0QsRUFLcUUsSUFMckUsRUFLMkUsSUFMM0UsRUFLaUYsSUFMakYsRUFNVCxJQU5TLEVBTUgsSUFORyxFQU1HLElBTkgsRUFNUyxJQU5ULEVBTWUsSUFOZixFQU1xQixJQU5yQixFQU0yQixJQU4zQixFQU1pQyxJQU5qQyxFQU11QyxJQU52QyxFQU02QyxJQU43QyxFQU1tRCxJQU5uRCxFQU15RCxJQU56RCxFQU0rRCxJQU4vRCxFQU1xRSxJQU5yRSxFQU0yRSxJQU4zRSxFQU1pRixJQU5qRixFQU9ULElBUFMsRUFPSCxJQVBHLEVBT0csSUFQSCxFQU9TLElBUFQsRUFPZSxJQVBmLEVBT3FCLElBUHJCLEVBTzJCLElBUDNCLEVBT2lDLElBUGpDLEVBT3VDLElBUHZDLEVBTzZDLElBUDdDLEVBT21ELElBUG5ELEVBT3lELElBUHpELEVBTytELElBUC9ELEVBT3FFLElBUHJFLEVBTzJFLElBUDNFLEVBT2lGLElBUGpGLEVBUVQsSUFSUyxFQVFILElBUkcsRUFRRyxJQVJILEVBUVMsSUFSVCxFQVFlLElBUmYsRUFRcUIsSUFSckIsRUFRMkIsSUFSM0IsRUFRaUMsSUFSakMsRUFRdUMsSUFSdkMsRUFRNkMsSUFSN0MsRUFRbUQsSUFSbkQsRUFReUQsSUFSekQsRUFRK0QsSUFSL0QsRUFRcUUsSUFSckUsRUFRMkUsSUFSM0UsRUFRaUYsSUFSakYsRUFTVCxJQVRTLEVBU0gsSUFURyxFQVNHLElBVEgsRUFTUyxJQVRULEVBU2UsSUFUZixFQVNxQixJQVRyQixFQVMyQixJQVQzQixFQVNpQyxJQVRqQyxFQVN1QyxJQVR2QyxFQVM2QyxJQVQ3QyxFQVNtRCxJQVRuRCxFQVN5RCxJQVR6RCxFQVMrRCxJQVQvRCxFQVNxRSxJQVRyRSxFQVMyRSxJQVQzRSxFQVNpRixJQVRqRixFQVVULElBVlMsRUFVSCxJQVZHLEVBVUcsSUFWSCxFQVVTLElBVlQsRUFVZSxJQVZmLEVBVXFCLElBVnJCLEVBVTJCLElBVjNCLEVBVWlDLElBVmpDLEVBVXVDLElBVnZDLEVBVTZDLElBVjdDLEVBVW1ELElBVm5ELEVBVXlELElBVnpELEVBVStELElBVi9ELEVBVXFFLElBVnJFLEVBVTJFLElBVjNFLEVBVWlGLElBVmpGLEVBV1QsSUFYUyxFQVdILElBWEcsRUFXRyxJQVhILEVBV1MsSUFYVCxFQVdlLElBWGYsRUFXcUIsSUFYckIsRUFXMkIsSUFYM0IsRUFXaUMsSUFYakMsRUFXdUMsSUFYdkMsRUFXNkMsSUFYN0MsRUFXbUQsSUFYbkQsRUFXeUQsSUFYekQsRUFXK0QsSUFYL0QsRUFXcUUsSUFYckUsRUFXMkUsSUFYM0UsRUFXaUYsSUFYakYsRUFZVCxJQVpTLEVBWUgsSUFaRyxFQVlHLElBWkgsRUFZUyxJQVpULEVBWWUsSUFaZixFQVlxQixJQVpyQixFQVkyQixJQVozQixFQVlpQyxJQVpqQyxFQVl1QyxJQVp2QyxFQVk2QyxJQVo3QyxFQVltRCxJQVpuRCxFQVl5RCxJQVp6RCxFQVkrRCxJQVovRCxFQVlxRSxJQVpyRSxFQVkyRSxJQVozRSxFQVlpRixJQVpqRixFQWFULElBYlMsRUFhSCxJQWJHLEVBYUcsSUFiSCxFQWFTLElBYlQsRUFhZSxJQWJmLEVBYXFCLElBYnJCLEVBYTJCLElBYjNCLEVBYWlDLElBYmpDLEVBYXVDLElBYnZDLEVBYTZDLElBYjdDLEVBYW1ELElBYm5ELEVBYXlELElBYnpELEVBYStELElBYi9ELEVBYXFFLElBYnJFLEVBYTJFLElBYjNFLEVBYWlGLElBYmpGLEVBY1QsSUFkUyxFQWNILElBZEcsRUFjRyxJQWRILEVBY1MsSUFkVCxFQWNlLElBZGYsRUFjcUIsSUFkckIsRUFjMkIsSUFkM0IsRUFjaUMsSUFkakMsRUFjdUMsSUFkdkMsRUFjNkMsSUFkN0MsRUFjbUQsSUFkbkQsRUFjeUQsSUFkekQsRUFjK0QsSUFkL0QsRUFjcUUsSUFkckUsRUFjMkUsSUFkM0UsRUFjaUYsSUFkakYsRUFlVCxJQWZTLEVBZUgsSUFmRyxFQWVHLElBZkgsRUFlUyxJQWZULEVBZWUsSUFmZixFQWVxQixJQWZyQixFQWUyQixJQWYzQixFQWVpQyxJQWZqQyxFQWV1QyxJQWZ2QyxFQWU2QyxJQWY3QyxFQWVtRCxJQWZuRCxFQWV5RCxJQWZ6RCxFQWUrRCxJQWYvRCxFQWVxRSxJQWZyRSxFQWUyRSxJQWYzRSxFQWVpRixJQWZqRixFQWdCVCxJQWhCUyxFQWdCSCxJQWhCRyxFQWdCRyxJQWhCSCxFQWdCUyxJQWhCVCxFQWdCZSxJQWhCZixFQWdCcUIsSUFoQnJCLEVBZ0IyQixJQWhCM0IsRUFnQmlDLElBaEJqQyxFQWdCdUMsSUFoQnZDLEVBZ0I2QyxJQWhCN0MsRUFnQm1ELElBaEJuRCxFQWdCeUQsSUFoQnpELEVBZ0IrRCxJQWhCL0QsRUFnQnFFLElBaEJyRSxFQWdCMkUsSUFoQjNFLEVBZ0JpRixJQWhCakYsQ0FBWDs7QUFtQkE7QUFDQSxNQUFJQyxPQUFPLENBQ1QsSUFEUyxFQUNILElBREcsRUFDRyxJQURILEVBQ1MsSUFEVCxFQUNlLElBRGYsRUFDcUIsSUFEckIsRUFDMkIsSUFEM0IsRUFDaUMsSUFEakMsRUFDdUMsSUFEdkMsRUFDNkMsSUFEN0MsRUFDbUQsSUFEbkQsRUFDeUQsSUFEekQsRUFDK0QsSUFEL0QsRUFDcUUsSUFEckUsRUFDMkUsSUFEM0UsRUFDaUYsSUFEakYsRUFFVCxJQUZTLEVBRUgsSUFGRyxFQUVHLElBRkgsRUFFUyxJQUZULEVBRWUsSUFGZixFQUVxQixJQUZyQixFQUUyQixJQUYzQixFQUVpQyxJQUZqQyxFQUV1QyxJQUZ2QyxFQUU2QyxJQUY3QyxFQUVtRCxJQUZuRCxFQUV5RCxJQUZ6RCxFQUUrRCxJQUYvRCxFQUVxRSxJQUZyRSxFQUUyRSxJQUYzRSxFQUVpRixJQUZqRixFQUdULElBSFMsRUFHSCxJQUhHLEVBR0csSUFISCxFQUdTLElBSFQsRUFHZSxJQUhmLEVBR3FCLElBSHJCLEVBRzJCLElBSDNCLEVBR2lDLElBSGpDLEVBR3VDLElBSHZDLEVBRzZDLElBSDdDLEVBR21ELElBSG5ELEVBR3lELElBSHpELEVBRytELElBSC9ELEVBR3FFLElBSHJFLEVBRzJFLElBSDNFLEVBR2lGLElBSGpGLEVBSVQsSUFKUyxFQUlILElBSkcsRUFJRyxJQUpILEVBSVMsSUFKVCxFQUllLElBSmYsRUFJcUIsSUFKckIsRUFJMkIsSUFKM0IsRUFJaUMsSUFKakMsRUFJdUMsSUFKdkMsRUFJNkMsSUFKN0MsRUFJbUQsSUFKbkQsRUFJeUQsSUFKekQsRUFJK0QsSUFKL0QsRUFJcUUsSUFKckUsRUFJMkUsSUFKM0UsRUFJaUYsSUFKakYsRUFLVCxJQUxTLEVBS0gsSUFMRyxFQUtHLElBTEgsRUFLUyxJQUxULEVBS2UsSUFMZixFQUtxQixJQUxyQixFQUsyQixJQUwzQixFQUtpQyxJQUxqQyxFQUt1QyxJQUx2QyxFQUs2QyxJQUw3QyxFQUttRCxJQUxuRCxFQUt5RCxJQUx6RCxFQUsrRCxJQUwvRCxFQUtxRSxJQUxyRSxFQUsyRSxJQUwzRSxFQUtpRixJQUxqRixFQU1ULElBTlMsRUFNSCxJQU5HLEVBTUcsSUFOSCxFQU1TLElBTlQsRUFNZSxJQU5mLEVBTXFCLElBTnJCLEVBTTJCLElBTjNCLEVBTWlDLElBTmpDLEVBTXVDLElBTnZDLEVBTTZDLElBTjdDLEVBTW1ELElBTm5ELEVBTXlELElBTnpELEVBTStELElBTi9ELEVBTXFFLElBTnJFLEVBTTJFLElBTjNFLEVBTWlGLElBTmpGLEVBT1QsSUFQUyxFQU9ILElBUEcsRUFPRyxJQVBILEVBT1MsSUFQVCxFQU9lLElBUGYsRUFPcUIsSUFQckIsRUFPMkIsSUFQM0IsRUFPaUMsSUFQakMsRUFPdUMsSUFQdkMsRUFPNkMsSUFQN0MsRUFPbUQsSUFQbkQsRUFPeUQsSUFQekQsRUFPK0QsSUFQL0QsRUFPcUUsSUFQckUsRUFPMkUsSUFQM0UsRUFPaUYsSUFQakYsRUFRVCxJQVJTLEVBUUgsSUFSRyxFQVFHLElBUkgsRUFRUyxJQVJULEVBUWUsSUFSZixFQVFxQixJQVJyQixFQVEyQixJQVIzQixFQVFpQyxJQVJqQyxFQVF1QyxJQVJ2QyxFQVE2QyxJQVI3QyxFQVFtRCxJQVJuRCxFQVF5RCxJQVJ6RCxFQVErRCxJQVIvRCxFQVFxRSxJQVJyRSxFQVEyRSxJQVIzRSxFQVFpRixJQVJqRixFQVNULElBVFMsRUFTSCxJQVRHLEVBU0csSUFUSCxFQVNTLElBVFQsRUFTZSxJQVRmLEVBU3FCLElBVHJCLEVBUzJCLElBVDNCLEVBU2lDLElBVGpDLEVBU3VDLElBVHZDLEVBUzZDLElBVDdDLEVBU21ELElBVG5ELEVBU3lELElBVHpELEVBUytELElBVC9ELEVBU3FFLElBVHJFLEVBUzJFLElBVDNFLEVBU2lGLElBVGpGLEVBVVQsSUFWUyxFQVVILElBVkcsRUFVRyxJQVZILEVBVVMsSUFWVCxFQVVlLElBVmYsRUFVcUIsSUFWckIsRUFVMkIsSUFWM0IsRUFVaUMsSUFWakMsRUFVdUMsSUFWdkMsRUFVNkMsSUFWN0MsRUFVbUQsSUFWbkQsRUFVeUQsSUFWekQsRUFVK0QsSUFWL0QsRUFVcUUsSUFWckUsRUFVMkUsSUFWM0UsRUFVaUYsSUFWakYsRUFXVCxJQVhTLEVBV0gsSUFYRyxFQVdHLElBWEgsRUFXUyxJQVhULEVBV2UsSUFYZixFQVdxQixJQVhyQixFQVcyQixJQVgzQixFQVdpQyxJQVhqQyxFQVd1QyxJQVh2QyxFQVc2QyxJQVg3QyxFQVdtRCxJQVhuRCxFQVd5RCxJQVh6RCxFQVcrRCxJQVgvRCxFQVdxRSxJQVhyRSxFQVcyRSxJQVgzRSxFQVdpRixJQVhqRixFQVlULElBWlMsRUFZSCxJQVpHLEVBWUcsSUFaSCxFQVlTLElBWlQsRUFZZSxJQVpmLEVBWXFCLElBWnJCLEVBWTJCLElBWjNCLEVBWWlDLElBWmpDLEVBWXVDLElBWnZDLEVBWTZDLElBWjdDLEVBWW1ELElBWm5ELEVBWXlELElBWnpELEVBWStELElBWi9ELEVBWXFFLElBWnJFLEVBWTJFLElBWjNFLEVBWWlGLElBWmpGLEVBYVQsSUFiUyxFQWFILElBYkcsRUFhRyxJQWJILEVBYVMsSUFiVCxFQWFlLElBYmYsRUFhcUIsSUFickIsRUFhMkIsSUFiM0IsRUFhaUMsSUFiakMsRUFhdUMsSUFidkMsRUFhNkMsSUFiN0MsRUFhbUQsSUFibkQsRUFheUQsSUFiekQsRUFhK0QsSUFiL0QsRUFhcUUsSUFickUsRUFhMkUsSUFiM0UsRUFhaUYsSUFiakYsRUFjVCxJQWRTLEVBY0gsSUFkRyxFQWNHLElBZEgsRUFjUyxJQWRULEVBY2UsSUFkZixFQWNxQixJQWRyQixFQWMyQixJQWQzQixFQWNpQyxJQWRqQyxFQWN1QyxJQWR2QyxFQWM2QyxJQWQ3QyxFQWNtRCxJQWRuRCxFQWN5RCxJQWR6RCxFQWMrRCxJQWQvRCxFQWNxRSxJQWRyRSxFQWMyRSxJQWQzRSxFQWNpRixJQWRqRixFQWVULElBZlMsRUFlSCxJQWZHLEVBZUcsSUFmSCxFQWVTLElBZlQsRUFlZSxJQWZmLEVBZXFCLElBZnJCLEVBZTJCLElBZjNCLEVBZWlDLElBZmpDLEVBZXVDLElBZnZDLEVBZTZDLElBZjdDLEVBZW1ELElBZm5ELEVBZXlELElBZnpELEVBZStELElBZi9ELEVBZXFFLElBZnJFLEVBZTJFLElBZjNFLEVBZWlGLElBZmpGLEVBZ0JULElBaEJTLEVBZ0JILElBaEJHLEVBZ0JHLElBaEJILEVBZ0JTLElBaEJULEVBZ0JlLElBaEJmLEVBZ0JxQixJQWhCckIsRUFnQjJCLElBaEIzQixFQWdCaUMsSUFoQmpDLEVBZ0J1QyxJQWhCdkMsRUFnQjZDLElBaEI3QyxFQWdCbUQsSUFoQm5ELEVBZ0J5RCxJQWhCekQsRUFnQitELElBaEIvRCxFQWdCcUUsSUFoQnJFLEVBZ0IyRSxJQWhCM0UsRUFnQmlGLElBaEJqRixDQUFYO0FBa0JBLE1BQUlDLG9CQUFvQixrRUFBeEI7QUFDRSxNQUFJQyxvQkFBb0IsSUFBSUMsS0FBSixDQUFVLENBQUMsQ0FBWCxFQUFjLENBQUMsQ0FBZixFQUFrQixDQUFDLENBQW5CLEVBQXNCLENBQUMsQ0FBdkIsRUFBMEIsQ0FBQyxDQUEzQixFQUE4QixDQUFDLENBQS9CLEVBQWtDLENBQUMsQ0FBbkMsRUFBc0MsQ0FBQyxDQUF2QyxFQUEwQyxDQUFDLENBQTNDLEVBQThDLENBQUMsQ0FBL0MsRUFBa0QsQ0FBQyxDQUFuRCxFQUFzRCxDQUFDLENBQXZELEVBQTBELENBQUMsQ0FBM0QsRUFBOEQsQ0FBQyxDQUEvRCxFQUFrRSxDQUFDLENBQW5FLEVBQXNFLENBQUMsQ0FBdkUsRUFBMEUsQ0FBQyxDQUEzRSxFQUE4RSxDQUFDLENBQS9FLEVBQWtGLENBQUMsQ0FBbkYsRUFBc0YsQ0FBQyxDQUF2RixFQUEwRixDQUFDLENBQTNGLEVBQThGLENBQUMsQ0FBL0YsRUFBa0csQ0FBQyxDQUFuRyxFQUFzRyxDQUFDLENBQXZHLEVBQTBHLENBQUMsQ0FBM0csRUFBOEcsQ0FBQyxDQUEvRyxFQUFrSCxDQUFDLENBQW5ILEVBQXNILENBQUMsQ0FBdkgsRUFBMEgsQ0FBQyxDQUEzSCxFQUE4SCxDQUFDLENBQS9ILEVBQWtJLENBQUMsQ0FBbkksRUFBc0ksQ0FBQyxDQUF2SSxFQUEwSSxDQUFDLENBQTNJLEVBQThJLENBQUMsQ0FBL0ksRUFBa0osQ0FBQyxDQUFuSixFQUFzSixDQUFDLENBQXZKLEVBQTBKLENBQUMsQ0FBM0osRUFBOEosQ0FBQyxDQUEvSixFQUFrSyxDQUFDLENBQW5LLEVBQXNLLENBQUMsQ0FBdkssRUFBMEssQ0FBQyxDQUEzSyxFQUE4SyxDQUFDLENBQS9LLEVBQWtMLENBQUMsQ0FBbkwsRUFBc0wsRUFBdEwsRUFBMEwsQ0FBQyxDQUEzTCxFQUE4TCxDQUFDLENBQS9MLEVBQWtNLENBQUMsQ0FBbk0sRUFBc00sRUFBdE0sRUFBME0sRUFBMU0sRUFBOE0sRUFBOU0sRUFBa04sRUFBbE4sRUFBc04sRUFBdE4sRUFBME4sRUFBMU4sRUFBOE4sRUFBOU4sRUFBa08sRUFBbE8sRUFBc08sRUFBdE8sRUFBME8sRUFBMU8sRUFBOE8sRUFBOU8sRUFBa1AsQ0FBQyxDQUFuUCxFQUFzUCxDQUFDLENBQXZQLEVBQTBQLENBQUMsQ0FBM1AsRUFBOFAsQ0FBQyxDQUEvUCxFQUFrUSxDQUFDLENBQW5RLEVBQXNRLENBQUMsQ0FBdlEsRUFBMFEsQ0FBQyxDQUEzUSxFQUE4USxDQUE5USxFQUFpUixDQUFqUixFQUFvUixDQUFwUixFQUF1UixDQUF2UixFQUEwUixDQUExUixFQUE2UixDQUE3UixFQUFnUyxDQUFoUyxFQUFtUyxDQUFuUyxFQUFzUyxDQUF0UyxFQUF5UyxDQUF6UyxFQUE0UyxFQUE1UyxFQUFnVCxFQUFoVCxFQUFvVCxFQUFwVCxFQUF3VCxFQUF4VCxFQUE0VCxFQUE1VCxFQUFnVSxFQUFoVSxFQUFvVSxFQUFwVSxFQUF3VSxFQUF4VSxFQUE0VSxFQUE1VSxFQUFnVixFQUFoVixFQUFvVixFQUFwVixFQUF3VixFQUF4VixFQUE0VixFQUE1VixFQUFnVyxFQUFoVyxFQUFvVyxFQUFwVyxFQUF3VyxFQUF4VyxFQUE0VyxDQUFDLENBQTdXLEVBQWdYLENBQUMsQ0FBalgsRUFBb1gsQ0FBQyxDQUFyWCxFQUF3WCxDQUFDLENBQXpYLEVBQTRYLENBQUMsQ0FBN1gsRUFBZ1ksQ0FBQyxDQUFqWSxFQUFvWSxFQUFwWSxFQUF3WSxFQUF4WSxFQUE0WSxFQUE1WSxFQUFnWixFQUFoWixFQUFvWixFQUFwWixFQUF3WixFQUF4WixFQUE0WixFQUE1WixFQUFnYSxFQUFoYSxFQUFvYSxFQUFwYSxFQUF3YSxFQUF4YSxFQUE0YSxFQUE1YSxFQUFnYixFQUFoYixFQUFvYixFQUFwYixFQUF3YixFQUF4YixFQUE0YixFQUE1YixFQUFnYyxFQUFoYyxFQUFvYyxFQUFwYyxFQUF3YyxFQUF4YyxFQUE0YyxFQUE1YyxFQUFnZCxFQUFoZCxFQUFvZCxFQUFwZCxFQUF3ZCxFQUF4ZCxFQUE0ZCxFQUE1ZCxFQUFnZSxFQUFoZSxFQUFvZSxFQUFwZSxFQUF3ZSxFQUF4ZSxFQUE0ZSxDQUFDLENBQTdlLEVBQWdmLENBQUMsQ0FBamYsRUFBb2YsQ0FBQyxDQUFyZixFQUF3ZixDQUFDLENBQXpmLEVBQTRmLENBQUMsQ0FBN2YsQ0FBeEI7QUFDRjtBQUNBO0FBQ0EsTUFBSUMsV0FBVyxFQUFmO0FBQUEsTUFBbUJDLFNBQVMsRUFBNUI7QUFBQSxNQUFnQ0MsVUFBVSxFQUExQztBQUFBLE1BQThDQyxVQUFVLEVBQXhEO0FBQUEsTUFBNERDLFFBQVEsRUFBcEU7QUFDQTtBQUNBLE1BQUlDLE9BQUosRUFBYUMsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLEVBQXdDQyxRQUF4QyxFQUFrREMsU0FBbEQ7QUFDQSxNQUFJQyxXQUFXLENBQWY7QUFDQTtBQUNBLFdBQVNDLE9BQVQsQ0FBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUNyQixRQUFJQyxFQUFKO0FBQ0EsUUFBSUYsSUFBSUMsQ0FBUixFQUFXO0FBQ1RDLFdBQUtGLENBQUw7QUFDQUEsVUFBSUMsQ0FBSjtBQUNBQSxVQUFJQyxFQUFKO0FBQ0Q7QUFDRDtBQUNBQSxTQUFLRCxDQUFMO0FBQ0FDLFVBQU1ELENBQU47QUFDQUMsVUFBTUQsQ0FBTjtBQUNBQyxXQUFPLENBQVA7QUFDQUEsVUFBTUYsQ0FBTjtBQUNBVixZQUFRWSxFQUFSLElBQWMsQ0FBZDtBQUNEOztBQUVEO0FBQ0EsV0FBU0MsUUFBVCxDQUFrQkgsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQ3RCLFFBQUlHLENBQUo7O0FBRUFmLFlBQVFXLElBQUlQLFFBQVFRLENBQXBCLElBQXlCLENBQXpCO0FBQ0EsU0FBS0csSUFBSSxDQUFDLENBQVYsRUFBYUEsSUFBSSxDQUFqQixFQUFvQkEsR0FBcEIsRUFBeUI7QUFDdkJmLGNBQVNXLElBQUlJLENBQUwsR0FBVVgsU0FBU1EsSUFBSSxDQUFiLENBQWxCLElBQXFDLENBQXJDO0FBQ0FaLGNBQVNXLElBQUksQ0FBTCxHQUFVUCxTQUFTUSxJQUFJRyxDQUFKLEdBQVEsQ0FBakIsQ0FBbEIsSUFBeUMsQ0FBekM7QUFDQWYsY0FBU1csSUFBSSxDQUFMLEdBQVVQLFNBQVNRLElBQUlHLENBQWIsQ0FBbEIsSUFBcUMsQ0FBckM7QUFDQWYsY0FBU1csSUFBSUksQ0FBSixHQUFRLENBQVQsR0FBY1gsU0FBU1EsSUFBSSxDQUFiLENBQXRCLElBQXlDLENBQXpDO0FBQ0Q7QUFDRCxTQUFLRyxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsR0FBbkIsRUFBd0I7QUFDdEJMLGNBQVFDLElBQUksQ0FBWixFQUFlQyxJQUFJRyxDQUFuQjtBQUNBTCxjQUFRQyxJQUFJLENBQVosRUFBZUMsSUFBSUcsQ0FBbkI7QUFDQUwsY0FBUUMsSUFBSUksQ0FBWixFQUFlSCxJQUFJLENBQW5CO0FBQ0FGLGNBQVFDLElBQUlJLENBQVosRUFBZUgsSUFBSSxDQUFuQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBU0ksS0FBVCxDQUFlTCxDQUFmLEVBQWtCO0FBQ2hCLFdBQU9BLEtBQUssR0FBWixFQUFpQjtBQUNmQSxXQUFLLEdBQUw7QUFDQUEsVUFBSSxDQUFDQSxLQUFLLENBQU4sS0FBWUEsSUFBSSxHQUFoQixDQUFKO0FBQ0Q7QUFDRCxXQUFPQSxDQUFQO0FBQ0Q7O0FBRUQsTUFBSU0sVUFBVSxFQUFkOztBQUVBO0FBQ0EsV0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCQyxLQUE5QixFQUFxQ0MsS0FBckMsRUFBNEM7QUFDMUMsUUFBSUMsQ0FBSixFQUFPUixDQUFQLEVBQVVTLEVBQVY7O0FBRUEsU0FBS0QsSUFBSSxDQUFULEVBQVlBLElBQUlELEtBQWhCLEVBQXVCQyxHQUF2QjtBQUNFekIsZUFBU3VCLFFBQVFFLENBQWpCLElBQXNCLENBQXRCO0FBREYsS0FFQSxLQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSUgsSUFBaEIsRUFBc0JHLEdBQXRCLEVBQTJCO0FBQ3pCQyxXQUFLL0IsS0FBS0ssU0FBU3FCLE9BQU9JLENBQWhCLElBQXFCekIsU0FBU3VCLEtBQVQsQ0FBMUIsQ0FBTDtBQUNBLFVBQUlHLE1BQU0sR0FBVixFQUFtQjtBQUNqQixhQUFLVCxJQUFJLENBQVQsRUFBWUEsSUFBSU8sS0FBaEIsRUFBdUJQLEdBQXZCO0FBQ0VqQixtQkFBU3VCLFFBQVFOLENBQVIsR0FBWSxDQUFyQixJQUEwQmpCLFNBQVN1QixRQUFRTixDQUFqQixJQUFzQnJCLEtBQUtzQixNQUFNUSxLQUFLUCxRQUFRSyxRQUFRUCxDQUFoQixDQUFYLENBQUwsQ0FBaEQ7QUFERixTQURGLE1BSUUsS0FBS0EsSUFBSU0sS0FBVCxFQUFnQk4sSUFBSU0sUUFBUUMsS0FBNUIsRUFBbUNQLEdBQW5DO0FBQ0VqQixpQkFBU2lCLENBQVQsSUFBY2pCLFNBQVNpQixJQUFJLENBQWIsQ0FBZDtBQURGLE9BRUZqQixTQUFTdUIsUUFBUUMsS0FBUixHQUFnQixDQUF6QixJQUE4QkUsTUFBTSxHQUFOLEdBQVksQ0FBWixHQUFnQjlCLEtBQUtzQixNQUFNUSxLQUFLUCxRQUFRLENBQVIsQ0FBWCxDQUFMLENBQTlDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBOztBQUVBO0FBQ0EsV0FBU1EsUUFBVCxDQUFrQmQsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQ3RCLFFBQUlDLEVBQUo7QUFDQSxRQUFJRixJQUFJQyxDQUFSLEVBQVc7QUFDVEMsV0FBS0YsQ0FBTDtBQUNBQSxVQUFJQyxDQUFKO0FBQ0FBLFVBQUlDLEVBQUo7QUFDRDtBQUNEQSxTQUFLRCxDQUFMO0FBQ0FDLFVBQU1ELElBQUlBLENBQVY7QUFDQUMsV0FBTyxDQUFQO0FBQ0FBLFVBQU1GLENBQU47QUFDQSxXQUFPVixRQUFRWSxFQUFSLENBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsV0FBU2EsU0FBVCxDQUFtQkMsQ0FBbkIsRUFBc0I7QUFDcEIsUUFBSWhCLENBQUosRUFBT0MsQ0FBUCxFQUFVZ0IsR0FBVixFQUFlQyxHQUFmOztBQUVBLFlBQVFGLENBQVI7QUFDRSxXQUFLLENBQUw7QUFDRSxhQUFLZixJQUFJLENBQVQsRUFBWUEsSUFBSVIsS0FBaEIsRUFBdUJRLEdBQXZCO0FBQ0UsZUFBS0QsSUFBSSxDQUFULEVBQVlBLElBQUlQLEtBQWhCLEVBQXVCTyxHQUF2QjtBQUNFLGdCQUFJLEVBQUdBLElBQUlDLENBQUwsR0FBVSxDQUFaLEtBQWtCLENBQUNhLFNBQVNkLENBQVQsRUFBWUMsQ0FBWixDQUF2QixFQUNFWixRQUFRVyxJQUFJQyxJQUFJUixLQUFoQixLQUEwQixDQUExQjtBQUZKO0FBREYsU0FJQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGFBQUtRLElBQUksQ0FBVCxFQUFZQSxJQUFJUixLQUFoQixFQUF1QlEsR0FBdkI7QUFDRSxlQUFLRCxJQUFJLENBQVQsRUFBWUEsSUFBSVAsS0FBaEIsRUFBdUJPLEdBQXZCO0FBQ0UsZ0JBQUksRUFBRUMsSUFBSSxDQUFOLEtBQVksQ0FBQ2EsU0FBU2QsQ0FBVCxFQUFZQyxDQUFaLENBQWpCLEVBQ0VaLFFBQVFXLElBQUlDLElBQUlSLEtBQWhCLEtBQTBCLENBQTFCO0FBRko7QUFERixTQUlBO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsYUFBS1EsSUFBSSxDQUFULEVBQVlBLElBQUlSLEtBQWhCLEVBQXVCUSxHQUF2QjtBQUNFLGVBQUtnQixNQUFNLENBQU4sRUFBU2pCLElBQUksQ0FBbEIsRUFBcUJBLElBQUlQLEtBQXpCLEVBQWdDTyxLQUFNaUIsS0FBdEMsRUFBNkM7QUFDM0MsZ0JBQUlBLE9BQU8sQ0FBWCxFQUNFQSxNQUFNLENBQU47QUFDRixnQkFBSSxDQUFDQSxHQUFELElBQVEsQ0FBQ0gsU0FBU2QsQ0FBVCxFQUFZQyxDQUFaLENBQWIsRUFDRVosUUFBUVcsSUFBSUMsSUFBSVIsS0FBaEIsS0FBMEIsQ0FBMUI7QUFDSDtBQU5ILFNBT0E7QUFDRixXQUFLLENBQUw7QUFDRSxhQUFLeUIsTUFBTSxDQUFOLEVBQVNqQixJQUFJLENBQWxCLEVBQXFCQSxJQUFJUixLQUF6QixFQUFnQ1EsS0FBTWlCLEtBQXRDLEVBQTZDO0FBQzNDLGNBQUlBLE9BQU8sQ0FBWCxFQUNFQSxNQUFNLENBQU47QUFDRixlQUFLRCxNQUFNQyxHQUFOLEVBQVdsQixJQUFJLENBQXBCLEVBQXVCQSxJQUFJUCxLQUEzQixFQUFrQ08sS0FBTWlCLEtBQXhDLEVBQStDO0FBQzdDLGdCQUFJQSxPQUFPLENBQVgsRUFDRUEsTUFBTSxDQUFOO0FBQ0YsZ0JBQUksQ0FBQ0EsR0FBRCxJQUFRLENBQUNILFNBQVNkLENBQVQsRUFBWUMsQ0FBWixDQUFiLEVBQ0VaLFFBQVFXLElBQUlDLElBQUlSLEtBQWhCLEtBQTBCLENBQTFCO0FBQ0g7QUFDRjtBQUNEO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsYUFBS1EsSUFBSSxDQUFULEVBQVlBLElBQUlSLEtBQWhCLEVBQXVCUSxHQUF2QjtBQUNFLGVBQUtnQixNQUFNLENBQU4sRUFBU0MsTUFBUWpCLEtBQUssQ0FBTixHQUFXLENBQTNCLEVBQStCRCxJQUFJLENBQXhDLEVBQTJDQSxJQUFJUCxLQUEvQyxFQUFzRE8sS0FBTWlCLEtBQTVELEVBQW1FO0FBQ2pFLGdCQUFJQSxPQUFPLENBQVgsRUFBYztBQUNaQSxvQkFBTSxDQUFOO0FBQ0FDLG9CQUFNLENBQUNBLEdBQVA7QUFDRDtBQUNELGdCQUFJLENBQUNBLEdBQUQsSUFBUSxDQUFDSixTQUFTZCxDQUFULEVBQVlDLENBQVosQ0FBYixFQUNFWixRQUFRVyxJQUFJQyxJQUFJUixLQUFoQixLQUEwQixDQUExQjtBQUNIO0FBUkgsU0FTQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGFBQUt5QixNQUFNLENBQU4sRUFBU2pCLElBQUksQ0FBbEIsRUFBcUJBLElBQUlSLEtBQXpCLEVBQWdDUSxLQUFNaUIsS0FBdEMsRUFBNkM7QUFDM0MsY0FBSUEsT0FBTyxDQUFYLEVBQ0VBLE1BQU0sQ0FBTjtBQUNGLGVBQUtELE1BQU0sQ0FBTixFQUFTakIsSUFBSSxDQUFsQixFQUFxQkEsSUFBSVAsS0FBekIsRUFBZ0NPLEtBQU1pQixLQUF0QyxFQUE2QztBQUMzQyxnQkFBSUEsT0FBTyxDQUFYLEVBQ0VBLE1BQU0sQ0FBTjtBQUNGLGdCQUFJLEVBQUUsQ0FBQ2pCLElBQUlDLENBQUosR0FBUSxDQUFULElBQWMsRUFBRSxDQUFDZ0IsR0FBRCxHQUFPLENBQUNDLEdBQVYsQ0FBaEIsS0FBbUMsQ0FBQ0osU0FBU2QsQ0FBVCxFQUFZQyxDQUFaLENBQXhDLEVBQ0VaLFFBQVFXLElBQUlDLElBQUlSLEtBQWhCLEtBQTBCLENBQTFCO0FBQ0g7QUFDRjtBQUNEO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsYUFBS3lCLE1BQU0sQ0FBTixFQUFTakIsSUFBSSxDQUFsQixFQUFxQkEsSUFBSVIsS0FBekIsRUFBZ0NRLEtBQU1pQixLQUF0QyxFQUE2QztBQUMzQyxjQUFJQSxPQUFPLENBQVgsRUFDRUEsTUFBTSxDQUFOO0FBQ0YsZUFBS0QsTUFBTSxDQUFOLEVBQVNqQixJQUFJLENBQWxCLEVBQXFCQSxJQUFJUCxLQUF6QixFQUFnQ08sS0FBTWlCLEtBQXRDLEVBQTZDO0FBQzNDLGdCQUFJQSxPQUFPLENBQVgsRUFDRUEsTUFBTSxDQUFOO0FBQ0YsZ0JBQUksRUFBRyxDQUFDakIsSUFBSUMsQ0FBSixHQUFRLENBQVQsS0FBZWdCLE9BQVFBLE9BQU9DLEdBQTlCLENBQUQsR0FBd0MsQ0FBMUMsS0FBZ0QsQ0FBQ0osU0FBU2QsQ0FBVCxFQUFZQyxDQUFaLENBQXJELEVBQ0VaLFFBQVFXLElBQUlDLElBQUlSLEtBQWhCLEtBQTBCLENBQTFCO0FBQ0g7QUFDRjtBQUNEO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsYUFBS3lCLE1BQU0sQ0FBTixFQUFTakIsSUFBSSxDQUFsQixFQUFxQkEsSUFBSVIsS0FBekIsRUFBZ0NRLEtBQU1pQixLQUF0QyxFQUE2QztBQUMzQyxjQUFJQSxPQUFPLENBQVgsRUFDRUEsTUFBTSxDQUFOO0FBQ0YsZUFBS0QsTUFBTSxDQUFOLEVBQVNqQixJQUFJLENBQWxCLEVBQXFCQSxJQUFJUCxLQUF6QixFQUFnQ08sS0FBTWlCLEtBQXRDLEVBQTZDO0FBQzNDLGdCQUFJQSxPQUFPLENBQVgsRUFDRUEsTUFBTSxDQUFOO0FBQ0YsZ0JBQUksRUFBRyxDQUFDQSxPQUFRQSxPQUFPQyxHQUFoQixLQUEwQmxCLElBQUlDLENBQUwsR0FBVSxDQUFuQyxDQUFELEdBQTBDLENBQTVDLEtBQWtELENBQUNhLFNBQVNkLENBQVQsRUFBWUMsQ0FBWixDQUF2RCxFQUNFWixRQUFRVyxJQUFJQyxJQUFJUixLQUFoQixLQUEwQixDQUExQjtBQUNIO0FBQ0Y7QUFDRDtBQWhGSjtBQWtGQTtBQUNEOztBQUVEO0FBQ0EsTUFBSTBCLEtBQUssQ0FBVDtBQUFBLE1BQVlDLEtBQUssQ0FBakI7QUFBQSxNQUFvQkMsS0FBSyxFQUF6QjtBQUFBLE1BQTZCQyxLQUFLLEVBQWxDOztBQUVBO0FBQ0E7QUFDQSxXQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QjtBQUN2QixRQUFJWixDQUFKO0FBQ0EsUUFBSWEsVUFBVSxDQUFkO0FBQ0EsU0FBS2IsSUFBSSxDQUFULEVBQVlBLEtBQUtZLE1BQWpCLEVBQXlCWixHQUF6QjtBQUNFLFVBQUlyQixNQUFNcUIsQ0FBTixLQUFZLENBQWhCLEVBQ0VhLFdBQVdOLEtBQUs1QixNQUFNcUIsQ0FBTixDQUFMLEdBQWdCLENBQTNCO0FBRkosS0FIdUIsQ0FNdkI7QUFDQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSVksU0FBUyxDQUF6QixFQUE0QlosS0FBSyxDQUFqQztBQUNFLFVBQUlyQixNQUFNcUIsSUFBSSxDQUFWLEtBQWdCckIsTUFBTXFCLElBQUksQ0FBVixDQUFoQixJQUNDckIsTUFBTXFCLElBQUksQ0FBVixLQUFnQnJCLE1BQU1xQixJQUFJLENBQVYsQ0FEakIsSUFFQ3JCLE1BQU1xQixJQUFJLENBQVYsS0FBZ0JyQixNQUFNcUIsSUFBSSxDQUFWLENBRmpCLElBR0NyQixNQUFNcUIsSUFBSSxDQUFWLElBQWUsQ0FBZixJQUFvQnJCLE1BQU1xQixDQUFOO0FBQ3ZCO0FBSkUsVUFLRXJCLE1BQU1xQixJQUFJLENBQVYsS0FBZ0IsQ0FBaEIsQ0FBa0I7QUFBbEIsU0FDQ0EsSUFBSSxDQUFKLEdBQVFZLE1BRFQsQ0FDaUI7QUFEakIsU0FFQ2pDLE1BQU1xQixJQUFJLENBQVYsSUFBZSxDQUFmLElBQW9CckIsTUFBTXFCLENBQU4sSUFBVyxDQUZoQyxJQUVxQ3JCLE1BQU1xQixJQUFJLENBQVYsSUFBZSxDQUFmLElBQW9CckIsTUFBTXFCLENBQU4sSUFBVyxDQVB0RSxDQUFKLEVBU0VhLFdBQVdKLEVBQVg7QUFWSixLQVdBLE9BQU9JLE9BQVA7QUFDRDs7QUFFRDtBQUNBLFdBQVNDLFFBQVQsR0FBb0I7QUFDbEIsUUFBSTFCLENBQUosRUFBT0MsQ0FBUCxFQUFVMEIsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxFQUFoQjtBQUNBLFFBQUlDLFVBQVUsQ0FBZDtBQUNBLFFBQUlDLEtBQUssQ0FBVDs7QUFFQTtBQUNBLFNBQUs5QixJQUFJLENBQVQsRUFBWUEsSUFBSVIsUUFBUSxDQUF4QixFQUEyQlEsR0FBM0I7QUFDRSxXQUFLRCxJQUFJLENBQVQsRUFBWUEsSUFBSVAsUUFBUSxDQUF4QixFQUEyQk8sR0FBM0I7QUFDRSxZQUFLWCxRQUFRVyxJQUFJUCxRQUFRUSxDQUFwQixLQUEwQlosUUFBU1csSUFBSSxDQUFMLEdBQVVQLFFBQVFRLENBQTFCLENBQTFCLElBQ0FaLFFBQVFXLElBQUlQLFNBQVNRLElBQUksQ0FBYixDQUFaLENBREEsSUFDZ0NaLFFBQVNXLElBQUksQ0FBTCxHQUFVUCxTQUFTUSxJQUFJLENBQWIsQ0FBbEIsQ0FEakMsSUFDcUU7QUFDcEUsVUFBRVosUUFBUVcsSUFBSVAsUUFBUVEsQ0FBcEIsS0FBMEJaLFFBQVNXLElBQUksQ0FBTCxHQUFVUCxRQUFRUSxDQUExQixDQUExQixJQUNBWixRQUFRVyxJQUFJUCxTQUFTUSxJQUFJLENBQWIsQ0FBWixDQURBLElBQ2dDWixRQUFTVyxJQUFJLENBQUwsR0FBVVAsU0FBU1EsSUFBSSxDQUFiLENBQWxCLENBRGxDLENBRkwsRUFHNEU7QUFDMUU2QixxQkFBV1YsRUFBWDtBQUxKO0FBREYsS0FOa0IsQ0FjbEI7QUFDQSxTQUFLbkIsSUFBSSxDQUFULEVBQVlBLElBQUlSLEtBQWhCLEVBQXVCUSxHQUF2QixFQUE0QjtBQUMxQlYsWUFBTSxDQUFOLElBQVcsQ0FBWDtBQUNBLFdBQUtvQyxJQUFJQyxJQUFJNUIsSUFBSSxDQUFqQixFQUFvQkEsSUFBSVAsS0FBeEIsRUFBK0JPLEdBQS9CLEVBQW9DO0FBQ2xDLFlBQUksQ0FBQzZCLEtBQUt4QyxRQUFRVyxJQUFJUCxRQUFRUSxDQUFwQixDQUFOLEtBQWlDMkIsQ0FBckMsRUFDRXJDLE1BQU1vQyxDQUFOLElBREYsS0FHRXBDLE1BQU0sRUFBRW9DLENBQVIsSUFBYSxDQUFiO0FBQ0ZDLFlBQUlDLEVBQUo7QUFDQUUsY0FBTUgsSUFBSSxDQUFKLEdBQVEsQ0FBQyxDQUFmO0FBQ0Q7QUFDREUsaUJBQVdQLFFBQVFJLENBQVIsQ0FBWDtBQUNEOztBQUVEO0FBQ0EsUUFBSUksS0FBSyxDQUFULEVBQ0VBLEtBQUssQ0FBQ0EsRUFBTjs7QUFFRixRQUFJQyxNQUFNRCxFQUFWO0FBQ0EsUUFBSUUsUUFBUSxDQUFaO0FBQ0FELFdBQU9BLE9BQU8sQ0FBZDtBQUNBQSxZQUFRLENBQVI7QUFDQSxXQUFPQSxNQUFNdkMsUUFBUUEsS0FBckI7QUFDRXVDLGFBQU92QyxRQUFRQSxLQUFmLEVBQXNCd0MsT0FBdEI7QUFERixLQUVBSCxXQUFXRyxRQUFRWCxFQUFuQjs7QUFFQTtBQUNBLFNBQUt0QixJQUFJLENBQVQsRUFBWUEsSUFBSVAsS0FBaEIsRUFBdUJPLEdBQXZCLEVBQTRCO0FBQzFCVCxZQUFNLENBQU4sSUFBVyxDQUFYO0FBQ0EsV0FBS29DLElBQUlDLElBQUkzQixJQUFJLENBQWpCLEVBQW9CQSxJQUFJUixLQUF4QixFQUErQlEsR0FBL0IsRUFBb0M7QUFDbEMsWUFBSSxDQUFDNEIsS0FBS3hDLFFBQVFXLElBQUlQLFFBQVFRLENBQXBCLENBQU4sS0FBaUMyQixDQUFyQyxFQUNFckMsTUFBTW9DLENBQU4sSUFERixLQUdFcEMsTUFBTSxFQUFFb0MsQ0FBUixJQUFhLENBQWI7QUFDRkMsWUFBSUMsRUFBSjtBQUNEO0FBQ0RDLGlCQUFXUCxRQUFRSSxDQUFSLENBQVg7QUFDRDtBQUNELFdBQU9HLE9BQVA7QUFDRDs7QUFFRCxXQUFTSSxRQUFULENBQWtCQyxRQUFsQixFQUE0QjtBQUMxQixRQUFJbkMsQ0FBSixFQUFPQyxDQUFQLEVBQVVtQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CMUIsQ0FBbkIsRUFBc0JSLENBQXRCLEVBQXlCWSxDQUF6Qjs7QUFFQTtBQUNBcUIsUUFBSUYsU0FBU1gsTUFBYjtBQUNBaEMsY0FBVSxDQUFWO0FBQ0EsT0FBRztBQUNEQTtBQUNBNEMsVUFBSSxDQUFDdEMsV0FBVyxDQUFaLElBQWlCLENBQWpCLEdBQXFCLENBQUNOLFVBQVUsQ0FBWCxJQUFnQixFQUF6QztBQUNBRSxpQkFBV2IsVUFBVXVELEdBQVYsQ0FBWDtBQUNBekMsaUJBQVdkLFVBQVV1RCxHQUFWLENBQVg7QUFDQXhDLGlCQUFXZixVQUFVdUQsR0FBVixDQUFYO0FBQ0F2QyxrQkFBWWhCLFVBQVV1RCxDQUFWLENBQVo7QUFDQUEsVUFBSXhDLFlBQVlGLFdBQVdDLFFBQXZCLElBQW1DQSxRQUFuQyxHQUE4QyxDQUE5QyxJQUFtREgsV0FBVyxDQUE5RCxDQUFKO0FBQ0EsVUFBSTZDLEtBQUtELENBQVQsRUFDRTtBQUNILEtBVkQsUUFVUzVDLFVBQVUsRUFWbkI7O0FBWUE7QUFDQUMsWUFBUSxLQUFLLElBQUlELE9BQWpCOztBQUVBO0FBQ0E4QyxRQUFJMUMsV0FBVyxDQUFDQSxXQUFXQyxTQUFaLEtBQTBCSCxXQUFXQyxRQUFyQyxDQUFYLEdBQTREQSxRQUFoRTtBQUNBLFNBQUswQyxJQUFJLENBQVQsRUFBWUEsSUFBSUMsQ0FBaEIsRUFBbUJELEdBQW5CO0FBQ0VqRCxhQUFPaUQsQ0FBUCxJQUFZLENBQVo7QUFERixLQUVBbEQsV0FBV2dELFNBQVNJLEtBQVQsQ0FBZSxDQUFmLENBQVg7O0FBRUEsU0FBS0YsSUFBSSxDQUFULEVBQVlBLElBQUk1QyxRQUFRQSxLQUF4QixFQUErQjRDLEdBQS9CO0FBQ0VoRCxjQUFRZ0QsQ0FBUixJQUFhLENBQWI7QUFERixLQUdBLEtBQUtBLElBQUksQ0FBVCxFQUFZQSxJQUFJLENBQUM1QyxTQUFTQSxRQUFRLENBQWpCLElBQXNCLENBQXZCLElBQTRCLENBQTVDLEVBQStDNEMsR0FBL0M7QUFDRS9DLGNBQVErQyxDQUFSLElBQWEsQ0FBYjtBQURGLEtBOUIwQixDQWlDMUI7QUFDQSxTQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsR0FBbkIsRUFBd0I7QUFDdEJELFVBQUksQ0FBSjtBQUNBbkMsVUFBSSxDQUFKO0FBQ0EsVUFBSW9DLEtBQUssQ0FBVCxFQUNFRCxJQUFLM0MsUUFBUSxDQUFiO0FBQ0YsVUFBSTRDLEtBQUssQ0FBVCxFQUNFcEMsSUFBS1IsUUFBUSxDQUFiO0FBQ0ZKLGNBQVNZLElBQUksQ0FBTCxHQUFVUixTQUFTMkMsSUFBSSxDQUFiLENBQWxCLElBQXFDLENBQXJDO0FBQ0EsV0FBS3BDLElBQUksQ0FBVCxFQUFZQSxJQUFJLENBQWhCLEVBQW1CQSxHQUFuQixFQUF3QjtBQUN0QlgsZ0JBQVNZLElBQUlELENBQUwsR0FBVVAsUUFBUTJDLENBQTFCLElBQStCLENBQS9CO0FBQ0EvQyxnQkFBUVksSUFBSVIsU0FBUzJDLElBQUlwQyxDQUFKLEdBQVEsQ0FBakIsQ0FBWixJQUFtQyxDQUFuQztBQUNBWCxnQkFBU1ksSUFBSSxDQUFMLEdBQVVSLFNBQVMyQyxJQUFJcEMsQ0FBYixDQUFsQixJQUFxQyxDQUFyQztBQUNBWCxnQkFBU1ksSUFBSUQsQ0FBSixHQUFRLENBQVQsR0FBY1AsU0FBUzJDLElBQUksQ0FBYixDQUF0QixJQUF5QyxDQUF6QztBQUNEO0FBQ0QsV0FBS3BDLElBQUksQ0FBVCxFQUFZQSxJQUFJLENBQWhCLEVBQW1CQSxHQUFuQixFQUF3QjtBQUN0QkQsZ0JBQVFFLElBQUlELENBQVosRUFBZW9DLElBQUksQ0FBbkI7QUFDQXJDLGdCQUFRRSxJQUFJLENBQVosRUFBZW1DLElBQUlwQyxDQUFKLEdBQVEsQ0FBdkI7QUFDQUQsZ0JBQVFFLElBQUksQ0FBWixFQUFlbUMsSUFBSXBDLENBQW5CO0FBQ0FELGdCQUFRRSxJQUFJRCxDQUFKLEdBQVEsQ0FBaEIsRUFBbUJvQyxJQUFJLENBQXZCO0FBQ0Q7QUFDRCxXQUFLcEMsSUFBSSxDQUFULEVBQVlBLElBQUksQ0FBaEIsRUFBbUJBLEdBQW5CLEVBQXdCO0FBQ3RCWCxnQkFBU1ksSUFBSUQsQ0FBTCxHQUFVUCxTQUFTMkMsSUFBSSxDQUFiLENBQWxCLElBQXFDLENBQXJDO0FBQ0EvQyxnQkFBU1ksSUFBSSxDQUFMLEdBQVVSLFNBQVMyQyxJQUFJcEMsQ0FBSixHQUFRLENBQWpCLENBQWxCLElBQXlDLENBQXpDO0FBQ0FYLGdCQUFTWSxJQUFJLENBQUwsR0FBVVIsU0FBUzJDLElBQUlwQyxDQUFiLENBQWxCLElBQXFDLENBQXJDO0FBQ0FYLGdCQUFTWSxJQUFJRCxDQUFKLEdBQVEsQ0FBVCxHQUFjUCxTQUFTMkMsSUFBSSxDQUFiLENBQXRCLElBQXlDLENBQXpDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFFBQUk1QyxVQUFVLENBQWQsRUFBaUI7QUFDZjZDLFVBQUkzRCxPQUFPYyxPQUFQLENBQUo7QUFDQVMsVUFBSVIsUUFBUSxDQUFaO0FBQ0EsZUFBVTtBQUNSTyxZQUFJUCxRQUFRLENBQVo7QUFDQSxlQUFPTyxJQUFJcUMsSUFBSSxDQUFmLEVBQWtCO0FBQ2hCbEMsbUJBQVNILENBQVQsRUFBWUMsQ0FBWjtBQUNBLGNBQUlELElBQUlxQyxDQUFSLEVBQ0U7QUFDRnJDLGVBQUtxQyxDQUFMO0FBQ0Q7QUFDRCxZQUFJcEMsS0FBS29DLElBQUksQ0FBYixFQUNFO0FBQ0ZwQyxhQUFLb0MsQ0FBTDtBQUNBbEMsaUJBQVMsQ0FBVCxFQUFZRixDQUFaO0FBQ0FFLGlCQUFTRixDQUFULEVBQVksQ0FBWjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQVosWUFBUSxJQUFJSSxTQUFTQSxRQUFRLENBQWpCLENBQVosSUFBbUMsQ0FBbkM7O0FBRUE7QUFDQSxTQUFLUSxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsR0FBbkIsRUFBd0I7QUFDdEJGLGNBQVEsQ0FBUixFQUFXRSxDQUFYO0FBQ0FGLGNBQVFOLFFBQVEsQ0FBaEIsRUFBbUJRLENBQW5CO0FBQ0FGLGNBQVEsQ0FBUixFQUFXRSxJQUFJUixLQUFKLEdBQVksQ0FBdkI7QUFDRDtBQUNELFNBQUtPLElBQUksQ0FBVCxFQUFZQSxJQUFJLENBQWhCLEVBQW1CQSxHQUFuQixFQUF3QjtBQUN0QkQsY0FBUUMsQ0FBUixFQUFXLENBQVg7QUFDQUQsY0FBUUMsSUFBSVAsS0FBSixHQUFZLENBQXBCLEVBQXVCLENBQXZCO0FBQ0FNLGNBQVFDLENBQVIsRUFBV1AsUUFBUSxDQUFuQjtBQUNEOztBQUVEO0FBQ0EsU0FBS08sSUFBSSxDQUFULEVBQVlBLElBQUksQ0FBaEIsRUFBbUJBLEdBQW5CO0FBQ0VELGNBQVFDLENBQVIsRUFBVyxDQUFYO0FBREYsS0FFQSxLQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsR0FBbkIsRUFBd0I7QUFDdEJELGNBQVFDLElBQUlQLEtBQUosR0FBWSxDQUFwQixFQUF1QixDQUF2QjtBQUNBTSxjQUFRLENBQVIsRUFBV0MsQ0FBWDtBQUNEO0FBQ0QsU0FBS0MsSUFBSSxDQUFULEVBQVlBLElBQUksQ0FBaEIsRUFBbUJBLEdBQW5CO0FBQ0VGLGNBQVEsQ0FBUixFQUFXRSxJQUFJUixLQUFKLEdBQVksQ0FBdkI7QUFERixLQXhHMEIsQ0EyRzFCO0FBQ0EsU0FBS08sSUFBSSxDQUFULEVBQVlBLElBQUlQLFFBQVEsRUFBeEIsRUFBNEJPLEdBQTVCO0FBQ0UsVUFBSUEsSUFBSSxDQUFSLEVBQVc7QUFDVEQsZ0JBQVEsSUFBSUMsQ0FBWixFQUFlLENBQWY7QUFDQUQsZ0JBQVEsQ0FBUixFQUFXLElBQUlDLENBQWY7QUFDRCxPQUhELE1BSUs7QUFDSFgsZ0JBQVMsSUFBSVcsQ0FBTCxHQUFVUCxRQUFRLENBQTFCLElBQStCLENBQS9CO0FBQ0FKLGdCQUFRLElBQUlJLFNBQVMsSUFBSU8sQ0FBYixDQUFaLElBQStCLENBQS9CO0FBQ0Q7QUFSSCxLQTVHMEIsQ0FzSDFCO0FBQ0EsUUFBSVIsVUFBVSxDQUFkLEVBQWlCO0FBQ2Y2QyxVQUFJMUQsS0FBS2EsVUFBVSxDQUFmLENBQUo7QUFDQTRDLFVBQUksRUFBSjtBQUNBLFdBQUtwQyxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsR0FBbkI7QUFDRSxhQUFLQyxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsS0FBTW1DLEdBQXpCO0FBQ0UsY0FBSSxLQUFLQSxJQUFJLEVBQUosR0FBUzVDLFdBQVk0QyxJQUFJLEVBQXpCLEdBQStCQyxLQUFLRCxDQUF6QyxDQUFKLEVBQWlEO0FBQy9DL0Msb0JBQVMsSUFBSVcsQ0FBTCxHQUFVUCxTQUFTLElBQUlRLENBQUosR0FBUVIsS0FBUixHQUFnQixFQUF6QixDQUFsQixJQUFrRCxDQUFsRDtBQUNBSixvQkFBUyxJQUFJWSxDQUFKLEdBQVFSLEtBQVIsR0FBZ0IsRUFBakIsR0FBdUJBLFNBQVMsSUFBSU8sQ0FBYixDQUEvQixJQUFrRCxDQUFsRDtBQUNELFdBSEQsTUFJSztBQUNIRCxvQkFBUSxJQUFJQyxDQUFaLEVBQWUsSUFBSUMsQ0FBSixHQUFRUixLQUFSLEdBQWdCLEVBQS9CO0FBQ0FNLG9CQUFRLElBQUlFLENBQUosR0FBUVIsS0FBUixHQUFnQixFQUF4QixFQUE0QixJQUFJTyxDQUFoQztBQUNEO0FBUkg7QUFERjtBQVVEOztBQUVEO0FBQ0EsU0FBS0MsSUFBSSxDQUFULEVBQVlBLElBQUlSLEtBQWhCLEVBQXVCUSxHQUF2QjtBQUNFLFdBQUtELElBQUksQ0FBVCxFQUFZQSxLQUFLQyxDQUFqQixFQUFvQkQsR0FBcEI7QUFDRSxZQUFJWCxRQUFRVyxJQUFJUCxRQUFRUSxDQUFwQixDQUFKLEVBQ0VGLFFBQVFDLENBQVIsRUFBV0MsQ0FBWDtBQUZKO0FBREYsS0F2STBCLENBNEkxQjtBQUNBO0FBQ0FxQyxRQUFJbkQsU0FBU3FDLE1BQWI7O0FBRUE7QUFDQSxTQUFLWixJQUFJLENBQVQsRUFBWUEsSUFBSTBCLENBQWhCLEVBQW1CMUIsR0FBbkI7QUFDRXhCLGFBQU93QixDQUFQLElBQVl6QixTQUFTcUQsVUFBVCxDQUFvQjVCLENBQXBCLENBQVo7QUFERixLQUVBekIsV0FBV0MsT0FBT21ELEtBQVAsQ0FBYSxDQUFiLENBQVg7O0FBRUE7QUFDQXZDLFFBQUlKLFlBQVlGLFdBQVdDLFFBQXZCLElBQW1DQSxRQUF2QztBQUNBLFFBQUkyQyxLQUFLdEMsSUFBSSxDQUFiLEVBQWdCO0FBQ2RzQyxVQUFJdEMsSUFBSSxDQUFSO0FBQ0EsVUFBSVIsVUFBVSxDQUFkLEVBQ0U4QztBQUNIOztBQUVEO0FBQ0ExQixRQUFJMEIsQ0FBSjtBQUNBLFFBQUk5QyxVQUFVLENBQWQsRUFBaUI7QUFDZkwsZUFBU3lCLElBQUksQ0FBYixJQUFrQixDQUFsQjtBQUNBekIsZUFBU3lCLElBQUksQ0FBYixJQUFrQixDQUFsQjtBQUNBLGFBQU9BLEdBQVAsRUFBWTtBQUNWeUIsWUFBSWxELFNBQVN5QixDQUFULENBQUo7QUFDQXpCLGlCQUFTeUIsSUFBSSxDQUFiLEtBQW1CLE1BQU95QixLQUFLLENBQS9CO0FBQ0FsRCxpQkFBU3lCLElBQUksQ0FBYixJQUFrQnlCLEtBQUssQ0FBdkI7QUFDRDtBQUNEbEQsZUFBUyxDQUFULEtBQWUsTUFBT21ELEtBQUssQ0FBM0I7QUFDQW5ELGVBQVMsQ0FBVCxJQUFjbUQsS0FBSyxDQUFuQjtBQUNBbkQsZUFBUyxDQUFULElBQWMsT0FBUW1ELEtBQUssRUFBM0I7QUFDRCxLQVhELE1BWUs7QUFDSG5ELGVBQVN5QixJQUFJLENBQWIsSUFBa0IsQ0FBbEI7QUFDQXpCLGVBQVN5QixJQUFJLENBQWIsSUFBa0IsQ0FBbEI7QUFDQSxhQUFPQSxHQUFQLEVBQVk7QUFDVnlCLFlBQUlsRCxTQUFTeUIsQ0FBVCxDQUFKO0FBQ0F6QixpQkFBU3lCLElBQUksQ0FBYixLQUFtQixNQUFPeUIsS0FBSyxDQUEvQjtBQUNBbEQsaUJBQVN5QixJQUFJLENBQWIsSUFBa0J5QixLQUFLLENBQXZCO0FBQ0Q7QUFDRGxELGVBQVMsQ0FBVCxLQUFlLE1BQU9tRCxLQUFLLENBQTNCO0FBQ0FuRCxlQUFTLENBQVQsSUFBYyxPQUFRbUQsS0FBSyxDQUEzQjtBQUNEO0FBQ0Q7QUFDQTFCLFFBQUkwQixJQUFJLENBQUosSUFBUzlDLFVBQVUsRUFBbkIsQ0FBSjtBQUNBLFdBQU9vQixJQUFJWixDQUFYLEVBQWM7QUFDWmIsZUFBU3lCLEdBQVQsSUFBZ0IsSUFBaEI7QUFDQTtBQUNBekIsZUFBU3lCLEdBQVQsSUFBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7QUFFQTtBQUNBTixZQUFRLENBQVIsSUFBYSxDQUFiO0FBQ0EsU0FBS00sSUFBSSxDQUFULEVBQVlBLElBQUlmLFNBQWhCLEVBQTJCZSxHQUEzQixFQUFnQztBQUM5Qk4sY0FBUU0sSUFBSSxDQUFaLElBQWlCLENBQWpCO0FBQ0EsV0FBS1IsSUFBSVEsQ0FBVCxFQUFZUixJQUFJLENBQWhCLEVBQW1CQSxHQUFuQjtBQUNFRSxnQkFBUUYsQ0FBUixJQUFhRSxRQUFRRixDQUFSLElBQ1RFLFFBQVFGLElBQUksQ0FBWixJQUFpQnJCLEtBQUtzQixNQUFNdkIsS0FBS3dCLFFBQVFGLENBQVIsQ0FBTCxJQUFtQlEsQ0FBekIsQ0FBTCxDQURSLEdBQzRDTixRQUFRRixJQUFJLENBQVosQ0FEekQ7QUFERixPQUdBRSxRQUFRLENBQVIsSUFBYXZCLEtBQUtzQixNQUFNdkIsS0FBS3dCLFFBQVEsQ0FBUixDQUFMLElBQW1CTSxDQUF6QixDQUFMLENBQWI7QUFDRDtBQUNELFNBQUtBLElBQUksQ0FBVCxFQUFZQSxLQUFLZixTQUFqQixFQUE0QmUsR0FBNUI7QUFDRU4sY0FBUU0sQ0FBUixJQUFhOUIsS0FBS3dCLFFBQVFNLENBQVIsQ0FBTCxDQUFiO0FBREYsS0F6TTBCLENBME1POztBQUVqQztBQUNBd0IsUUFBSXBDLENBQUo7QUFDQUMsUUFBSSxDQUFKO0FBQ0EsU0FBS1csSUFBSSxDQUFULEVBQVlBLElBQUlsQixRQUFoQixFQUEwQmtCLEdBQTFCLEVBQStCO0FBQzdCTCxlQUFTTixDQUFULEVBQVlMLFFBQVosRUFBc0J3QyxDQUF0QixFQUF5QnZDLFNBQXpCO0FBQ0FJLFdBQUtMLFFBQUw7QUFDQXdDLFdBQUt2QyxTQUFMO0FBQ0Q7QUFDRCxTQUFLZSxJQUFJLENBQVQsRUFBWUEsSUFBSWpCLFFBQWhCLEVBQTBCaUIsR0FBMUIsRUFBK0I7QUFDN0JMLGVBQVNOLENBQVQsRUFBWUwsV0FBVyxDQUF2QixFQUEwQndDLENBQTFCLEVBQTZCdkMsU0FBN0I7QUFDQUksV0FBS0wsV0FBVyxDQUFoQjtBQUNBd0MsV0FBS3ZDLFNBQUw7QUFDRDtBQUNEO0FBQ0FJLFFBQUksQ0FBSjtBQUNBLFNBQUtXLElBQUksQ0FBVCxFQUFZQSxJQUFJaEIsUUFBaEIsRUFBMEJnQixHQUExQixFQUErQjtBQUM3QixXQUFLUixJQUFJLENBQVQsRUFBWUEsSUFBSVYsUUFBaEIsRUFBMEJVLEdBQTFCO0FBQ0VoQixlQUFPYSxHQUFQLElBQWNkLFNBQVN5QixJQUFJUixJQUFJUixRQUFqQixDQUFkO0FBREYsT0FFQSxLQUFLUSxJQUFJLENBQVQsRUFBWUEsSUFBSVQsUUFBaEIsRUFBMEJTLEdBQTFCO0FBQ0VoQixlQUFPYSxHQUFQLElBQWNkLFNBQVVPLFdBQVdFLFFBQVosR0FBd0JnQixDQUF4QixHQUE2QlIsS0FBS1IsV0FBVyxDQUFoQixDQUF0QyxDQUFkO0FBREY7QUFFRDtBQUNELFNBQUtRLElBQUksQ0FBVCxFQUFZQSxJQUFJVCxRQUFoQixFQUEwQlMsR0FBMUI7QUFDRWhCLGFBQU9hLEdBQVAsSUFBY2QsU0FBVU8sV0FBV0UsUUFBWixHQUF3QmdCLENBQXhCLEdBQTZCUixLQUFLUixXQUFXLENBQWhCLENBQXRDLENBQWQ7QUFERixLQUVBLEtBQUtnQixJQUFJLENBQVQsRUFBWUEsSUFBSWYsU0FBaEIsRUFBMkJlLEdBQTNCO0FBQ0UsV0FBS1IsSUFBSSxDQUFULEVBQVlBLElBQUlWLFdBQVdDLFFBQTNCLEVBQXFDUyxHQUFyQztBQUNFaEIsZUFBT2EsR0FBUCxJQUFjZCxTQUFTYSxJQUFJWSxDQUFKLEdBQVFSLElBQUlQLFNBQXJCLENBQWQ7QUFERjtBQURGLEtBR0FWLFdBQVdDLE1BQVg7O0FBRUE7QUFDQVksUUFBSUMsSUFBSVIsUUFBUSxDQUFoQjtBQUNBMkMsUUFBSUUsSUFBSSxDQUFSLENBMU8wQixDQTBPUDtBQUNuQjtBQUNBdEIsUUFBSSxDQUFDcEIsV0FBV0MsU0FBWixLQUEwQkgsV0FBV0MsUUFBckMsSUFBaURBLFFBQXJEO0FBQ0EsU0FBS2lCLElBQUksQ0FBVCxFQUFZQSxJQUFJSSxDQUFoQixFQUFtQkosR0FBbkIsRUFBd0I7QUFDdEJ5QixVQUFJbEQsU0FBU3lCLENBQVQsQ0FBSjtBQUNBLFdBQUtSLElBQUksQ0FBVCxFQUFZQSxJQUFJLENBQWhCLEVBQW1CQSxLQUFNaUMsTUFBTSxDQUEvQixFQUFrQztBQUNoQyxZQUFJLE9BQU9BLENBQVgsRUFDRWhELFFBQVFXLElBQUlQLFFBQVFRLENBQXBCLElBQXlCLENBQXpCO0FBQ0YsV0FBRztBQUFTO0FBQ1YsY0FBSXFDLENBQUosRUFDRXRDLElBREYsS0FFSztBQUNIQTtBQUNBLGdCQUFJb0MsQ0FBSixFQUFPO0FBQ0wsa0JBQUluQyxLQUFLLENBQVQsRUFDRUEsSUFERixLQUVLO0FBQ0hELHFCQUFLLENBQUw7QUFDQW9DLG9CQUFJLENBQUNBLENBQUw7QUFDQSxvQkFBSXBDLEtBQUssQ0FBVCxFQUFZO0FBQ1ZBO0FBQ0FDLHNCQUFJLENBQUo7QUFDRDtBQUNGO0FBQ0YsYUFYRCxNQVlLO0FBQ0gsa0JBQUlBLEtBQUtSLFFBQVEsQ0FBakIsRUFDRVEsSUFERixLQUVLO0FBQ0hELHFCQUFLLENBQUw7QUFDQW9DLG9CQUFJLENBQUNBLENBQUw7QUFDQSxvQkFBSXBDLEtBQUssQ0FBVCxFQUFZO0FBQ1ZBO0FBQ0FDLHVCQUFLLENBQUw7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNEcUMsY0FBSSxDQUFDQSxDQUFMO0FBQ0QsU0EvQkQsUUErQlN4QixTQUFTZCxDQUFULEVBQVlDLENBQVosQ0EvQlQ7QUFnQ0Q7QUFDRjs7QUFFRDtBQUNBZCxlQUFXRSxRQUFRa0QsS0FBUixDQUFjLENBQWQsQ0FBWDtBQUNBRixRQUFJLENBQUosQ0F2UjBCLENBdVJUO0FBQ2pCcEMsUUFBSSxLQUFKLENBeFIwQixDQXdSUDtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFLbUMsSUFBSSxDQUFULEVBQVlBLElBQUksQ0FBaEIsRUFBbUJBLEdBQW5CLEVBQXdCO0FBQ3RCckIsZ0JBQVVxQixDQUFWLEVBRHNCLENBQ0g7QUFDbkJwQyxVQUFJMEIsVUFBSjtBQUNBLFVBQUkxQixJQUFJQyxDQUFSLEVBQVc7QUFBRTtBQUNYQSxZQUFJRCxDQUFKO0FBQ0FxQyxZQUFJRCxDQUFKO0FBQ0Q7QUFDRCxVQUFJQyxLQUFLLENBQVQsRUFDRSxNQVJvQixDQVFQO0FBQ2ZoRCxnQkFBVUYsU0FBU29ELEtBQVQsQ0FBZSxDQUFmLENBQVYsQ0FUc0IsQ0FTTztBQUM5QjtBQUNELFFBQUlGLEtBQUtELENBQVQsRUFBb0I7QUFDbEJyQixnQkFBVXNCLENBQVY7O0FBRUY7QUFDQXBDLFFBQUlyQixRQUFReUQsS0FBTXZDLFdBQVcsQ0FBWixJQUFrQixDQUF2QixDQUFSLENBQUo7QUFDQTtBQUNBLFNBQUtzQyxJQUFJLENBQVQsRUFBWUEsSUFBSSxDQUFoQixFQUFtQkEsS0FBTW5DLE1BQU0sQ0FBL0I7QUFDRSxVQUFJQSxJQUFJLENBQVIsRUFBVztBQUNUWixnQkFBU0ksUUFBUSxDQUFSLEdBQVkyQyxDQUFiLEdBQWtCM0MsUUFBUSxDQUFsQyxJQUF1QyxDQUF2QztBQUNBLFlBQUkyQyxJQUFJLENBQVIsRUFDRS9DLFFBQVEsSUFBSUksUUFBUTJDLENBQXBCLElBQXlCLENBQXpCLENBREYsS0FHRS9DLFFBQVEsSUFBSUksU0FBUzJDLElBQUksQ0FBYixDQUFaLElBQStCLENBQS9CO0FBQ0g7QUFQSCxLQTdTMEIsQ0FxVDFCO0FBQ0EsU0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUksQ0FBaEIsRUFBbUJBLEtBQU1uQyxNQUFNLENBQS9CO0FBQ0UsVUFBSUEsSUFBSSxDQUFSLEVBQVc7QUFDVFosZ0JBQVEsSUFBSUksU0FBU0EsUUFBUSxDQUFSLEdBQVkyQyxDQUFyQixDQUFaLElBQXVDLENBQXZDO0FBQ0EsWUFBSUEsQ0FBSixFQUNFL0MsUUFBUyxJQUFJK0MsQ0FBTCxHQUFVM0MsUUFBUSxDQUExQixJQUErQixDQUEvQixDQURGLEtBR0VKLFFBQVEsSUFBSUksUUFBUSxDQUFwQixJQUF5QixDQUF6QjtBQUNIO0FBUEgsS0FRQSxPQUFPSixPQUFQO0FBQ0Q7O0FBS0QsTUFBSW9ELFVBQVUsSUFBZDs7QUFFQSxNQUFJQyxNQUFNOztBQUVSLFFBQUk1QyxRQUFKLEdBQWU7QUFDYixhQUFPQSxRQUFQO0FBQ0QsS0FKTzs7QUFNUixRQUFJQSxRQUFKLENBQWE2QyxHQUFiLEVBQWtCO0FBQ2hCN0MsaUJBQVc2QyxHQUFYO0FBQ0QsS0FSTzs7QUFVUixRQUFJQyxJQUFKLEdBQVc7QUFDVCxhQUFPQyxLQUFQO0FBQ0QsS0FaTzs7QUFjUixRQUFJRCxJQUFKLENBQVNELEdBQVQsRUFBYztBQUNaRSxjQUFRRixHQUFSO0FBQ0QsS0FoQk87O0FBa0JSLFFBQUlHLE1BQUosR0FBYTtBQUNYLGFBQU9MLE9BQVA7QUFDRCxLQXBCTzs7QUFzQlIsUUFBSUssTUFBSixDQUFXQyxFQUFYLEVBQWU7QUFDYk4sZ0JBQVVNLEVBQVY7QUFDRCxLQXhCTzs7QUEwQlJDLGNBQVUsa0JBQVVDLE1BQVYsRUFBa0I7QUFDMUIsYUFBT2YsU0FBU2UsTUFBVCxDQUFQO0FBQ0QsS0E1Qk87QUE2QlI7QUFDQUMsY0FBVSxrQkFBVUMsR0FBVixFQUFlO0FBQ3ZCLFVBQUlDLEdBQUosRUFBU3hDLENBQVQsRUFBWXlDLEdBQVosRUFBaUJDLENBQWpCOztBQUVBRixZQUFNLEVBQU47QUFDQUMsWUFBTUYsSUFBSTNCLE1BQVY7QUFDQSxXQUFLWixJQUFJLENBQVQsRUFBWUEsSUFBSXlDLEdBQWhCLEVBQXFCekMsR0FBckIsRUFBMEI7QUFDeEIwQyxZQUFJSCxJQUFJWCxVQUFKLENBQWU1QixDQUFmLENBQUo7QUFDQSxZQUFLMEMsS0FBSyxNQUFOLElBQWtCQSxLQUFLLE1BQTNCLEVBQW9DO0FBQ2xDRixpQkFBT0QsSUFBSUksTUFBSixDQUFXM0MsQ0FBWCxDQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUkwQyxJQUFJLE1BQVIsRUFBZ0I7QUFDckJGLGlCQUFPSSxPQUFPQyxZQUFQLENBQW9CLE9BQVNILEtBQUssRUFBTixHQUFZLElBQXhDLENBQVA7QUFDQUYsaUJBQU9JLE9BQU9DLFlBQVAsQ0FBb0IsT0FBU0gsS0FBSyxDQUFOLEdBQVcsSUFBdkMsQ0FBUDtBQUNBRixpQkFBT0ksT0FBT0MsWUFBUCxDQUFvQixPQUFTSCxLQUFLLENBQU4sR0FBVyxJQUF2QyxDQUFQO0FBQ0QsU0FKTSxNQUlBO0FBQ0xGLGlCQUFPSSxPQUFPQyxZQUFQLENBQW9CLE9BQVNILEtBQUssQ0FBTixHQUFXLElBQXZDLENBQVA7QUFDQUYsaUJBQU9JLE9BQU9DLFlBQVAsQ0FBb0IsT0FBU0gsS0FBSyxDQUFOLEdBQVcsSUFBdkMsQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxhQUFPRixHQUFQO0FBQ0QsS0FqRE87QUFrRFJNLGtCQUFjLHNCQUFVUCxHQUFWLEVBQWM7QUFDeEIsVUFBSUMsR0FBSixFQUFTeEMsQ0FBVCxFQUFZeUMsR0FBWjtBQUNBLFVBQUlNLEVBQUosRUFBUUMsRUFBUixFQUFZQyxFQUFaO0FBQ0FSLFlBQU1GLElBQUkzQixNQUFWO0FBQ0FaLFVBQUksQ0FBSjtBQUNBd0MsWUFBTSxFQUFOO0FBQ0EsYUFBT3hDLElBQUl5QyxHQUFYLEVBQWdCO0FBQ1pNLGFBQUtSLElBQUlYLFVBQUosQ0FBZTVCLEdBQWYsSUFBc0IsSUFBM0I7QUFDQSxZQUFJQSxLQUFLeUMsR0FBVCxFQUFjO0FBQ1ZELGlCQUFPcEUsa0JBQWtCdUUsTUFBbEIsQ0FBeUJJLE1BQU0sQ0FBL0IsQ0FBUDtBQUNBUCxpQkFBT3BFLGtCQUFrQnVFLE1BQWxCLENBQXlCLENBQUNJLEtBQUssR0FBTixLQUFjLENBQXZDLENBQVA7QUFDQVAsaUJBQU8sSUFBUDtBQUNBO0FBQ0g7QUFDRFEsYUFBS1QsSUFBSVgsVUFBSixDQUFlNUIsR0FBZixDQUFMO0FBQ0EsWUFBSUEsS0FBS3lDLEdBQVQsRUFBYztBQUNWRCxpQkFBT3BFLGtCQUFrQnVFLE1BQWxCLENBQXlCSSxNQUFNLENBQS9CLENBQVA7QUFDQVAsaUJBQU9wRSxrQkFBa0J1RSxNQUFsQixDQUEwQixDQUFDSSxLQUFLLEdBQU4sS0FBYyxDQUFmLEdBQXFCLENBQUNDLEtBQUssSUFBTixLQUFlLENBQTdELENBQVA7QUFDQVIsaUJBQU9wRSxrQkFBa0J1RSxNQUFsQixDQUF5QixDQUFDSyxLQUFLLEdBQU4sS0FBYyxDQUF2QyxDQUFQO0FBQ0FSLGlCQUFPLEdBQVA7QUFDQTtBQUNIO0FBQ0RTLGFBQUtWLElBQUlYLFVBQUosQ0FBZTVCLEdBQWYsQ0FBTDtBQUNBd0MsZUFBT3BFLGtCQUFrQnVFLE1BQWxCLENBQXlCSSxNQUFNLENBQS9CLENBQVA7QUFDQVAsZUFBT3BFLGtCQUFrQnVFLE1BQWxCLENBQTBCLENBQUNJLEtBQUssR0FBTixLQUFjLENBQWYsR0FBcUIsQ0FBQ0MsS0FBSyxJQUFOLEtBQWUsQ0FBN0QsQ0FBUDtBQUNBUixlQUFPcEUsa0JBQWtCdUUsTUFBbEIsQ0FBMEIsQ0FBQ0ssS0FBSyxHQUFOLEtBQWMsQ0FBZixHQUFxQixDQUFDQyxLQUFLLElBQU4sS0FBZSxDQUE3RCxDQUFQO0FBQ0FULGVBQU9wRSxrQkFBa0J1RSxNQUFsQixDQUF5Qk0sS0FBSyxJQUE5QixDQUFQO0FBQ0g7QUFDRCxhQUFPVCxHQUFQO0FBQ0gsS0EvRU87O0FBaUZSVSxVQUFNLGNBQVVYLEdBQVYsRUFBZUwsTUFBZixFQUF1QmlCLElBQXZCLEVBQTZCQyxJQUE3QixFQUFtQ0MsR0FBbkMsRUFBd0M7QUFDNUMsVUFBSUMsT0FBTyxJQUFYO0FBQ0FwRSxpQkFBV21FLE9BQU9uRSxRQUFsQjtBQUNBZ0QsZUFBU0EsVUFBVUwsT0FBbkI7QUFDQSxVQUFJLENBQUNLLE1BQUwsRUFBYTtBQUNYcUIsZ0JBQVFDLElBQVIsQ0FBYSx3Q0FBYjtBQUNBO0FBQ0Q7O0FBRUQsVUFBSXhCLE9BQU95QixLQUFLQyxHQUFMLENBQVNQLElBQVQsRUFBZUMsSUFBZixDQUFYO0FBQ0FiLFlBQU1lLEtBQUtoQixRQUFMLENBQWNDLEdBQWQsQ0FBTixDQVY0QyxDQVVuQjs7QUFFekIsVUFBSW9CLFFBQVFMLEtBQUtsQixRQUFMLENBQWNHLEdBQWQsQ0FBWjtBQUFBLFVBQ0VxQixNQUFNQyxHQUFHQyxtQkFBSCxDQUF1QjVCLE1BQXZCLENBRFI7QUFBQSxVQUVFNkIsS0FBS04sS0FBS08sS0FBTCxDQUFXaEMsUUFBUW5ELFFBQVEsQ0FBaEIsQ0FBWCxDQUZQO0FBR0EsVUFBSW9GLGNBQWNGLE1BQU1sRixRQUFRLENBQWQsQ0FBbEI7QUFBQSxVQUNFcUYsU0FBU1QsS0FBS1UsS0FBTCxDQUFXLENBQUNuQyxPQUFPaUMsV0FBUixJQUF1QixDQUFsQyxDQURYO0FBRUFqQyxhQUFPaUMsV0FBUDtBQUNBTCxVQUFJUSxZQUFKLENBQWlCLFNBQWpCO0FBQ0FSLFVBQUlTLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CbEIsSUFBbkIsRUFBeUJBLElBQXpCO0FBQ0FTLFVBQUlRLFlBQUosQ0FBaUIsU0FBakI7QUFDQSxXQUFLLElBQUlwRSxJQUFJLENBQWIsRUFBZ0JBLElBQUluQixLQUFwQixFQUEyQm1CLEdBQTNCLEVBQWdDO0FBQzlCLGFBQUssSUFBSVIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJWCxLQUFwQixFQUEyQlcsR0FBM0IsRUFBZ0M7QUFDOUIsY0FBSW1FLE1BQU1uRSxJQUFJWCxLQUFKLEdBQVltQixDQUFsQixDQUFKLEVBQTBCO0FBQ3hCNEQsZ0JBQUlTLFFBQUosQ0FBYU4sTUFBTSxJQUFJL0QsQ0FBVixJQUFla0UsTUFBNUIsRUFBb0NILE1BQU0sSUFBSXZFLENBQVYsSUFBZTBFLE1BQW5ELEVBQTJESCxFQUEzRCxFQUErREEsRUFBL0Q7QUFDRDtBQUNGO0FBQ0Y7QUFDREgsVUFBSVYsSUFBSjtBQUNEO0FBOUdPLEdBQVY7QUFnSEFvQixTQUFPQyxPQUFQLEdBQWlCLEVBQUV6QyxRQUFGLEVBQWpCO0FBRUQsQ0E5eUJBLEVBQUQiLCJmaWxlIjoicXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIShmdW5jdGlvbiAoKSB7XG5cbiAgLy8gYWxpZ25tZW50IHBhdHRlcm5cbiAgdmFyIGFkZWx0YSA9IFtcbiAgICAwLCAxMSwgMTUsIDE5LCAyMywgMjcsIDMxLFxuICAgIDE2LCAxOCwgMjAsIDIyLCAyNCwgMjYsIDI4LCAyMCwgMjIsIDI0LCAyNCwgMjYsIDI4LCAyOCwgMjIsIDI0LCAyNCxcbiAgICAyNiwgMjYsIDI4LCAyOCwgMjQsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjgsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjhcbiAgXTtcblxuICAvLyB2ZXJzaW9uIGJsb2NrXG4gIHZhciB2cGF0ID0gW1xuICAgIDB4Yzk0LCAweDViYywgMHhhOTksIDB4NGQzLCAweGJmNiwgMHg3NjIsIDB4ODQ3LCAweDYwZCxcbiAgICAweDkyOCwgMHhiNzgsIDB4NDVkLCAweGExNywgMHg1MzIsIDB4OWE2LCAweDY4MywgMHg4YzksXG4gICAgMHg3ZWMsIDB4ZWM0LCAweDFlMSwgMHhmYWIsIDB4MDhlLCAweGMxYSwgMHgzM2YsIDB4ZDc1LFxuICAgIDB4MjUwLCAweDlkNSwgMHg2ZjAsIDB4OGJhLCAweDc5ZiwgMHhiMGIsIDB4NDJlLCAweGE2NCxcbiAgICAweDU0MSwgMHhjNjlcbiAgXTtcblxuICAvLyBmaW5hbCBmb3JtYXQgYml0cyB3aXRoIG1hc2s6IGxldmVsIDw8IDMgfCBtYXNrXG4gIHZhciBmbXR3b3JkID0gW1xuICAgIDB4NzdjNCwgMHg3MmYzLCAweDdkYWEsIDB4Nzg5ZCwgMHg2NjJmLCAweDYzMTgsIDB4NmM0MSwgMHg2OTc2LCAgICAvL0xcbiAgICAweDU0MTIsIDB4NTEyNSwgMHg1ZTdjLCAweDViNGIsIDB4NDVmOSwgMHg0MGNlLCAweDRmOTcsIDB4NGFhMCwgICAgLy9NXG4gICAgMHgzNTVmLCAweDMwNjgsIDB4M2YzMSwgMHgzYTA2LCAweDI0YjQsIDB4MjE4MywgMHgyZWRhLCAweDJiZWQsICAgIC8vUVxuICAgIDB4MTY4OSwgMHgxM2JlLCAweDFjZTcsIDB4MTlkMCwgMHgwNzYyLCAweDAyNTUsIDB4MGQwYywgMHgwODNiICAgIC8vSFxuICBdO1xuXG4gIC8vIDQgcGVyIHZlcnNpb246IG51bWJlciBvZiBibG9ja3MgMSwyOyBkYXRhIHdpZHRoOyBlY2Mgd2lkdGhcbiAgdmFyIGVjY2Jsb2NrcyA9IFtcbiAgICAxLCAwLCAxOSwgNywgMSwgMCwgMTYsIDEwLCAxLCAwLCAxMywgMTMsIDEsIDAsIDksIDE3LFxuICAgIDEsIDAsIDM0LCAxMCwgMSwgMCwgMjgsIDE2LCAxLCAwLCAyMiwgMjIsIDEsIDAsIDE2LCAyOCxcbiAgICAxLCAwLCA1NSwgMTUsIDEsIDAsIDQ0LCAyNiwgMiwgMCwgMTcsIDE4LCAyLCAwLCAxMywgMjIsXG4gICAgMSwgMCwgODAsIDIwLCAyLCAwLCAzMiwgMTgsIDIsIDAsIDI0LCAyNiwgNCwgMCwgOSwgMTYsXG4gICAgMSwgMCwgMTA4LCAyNiwgMiwgMCwgNDMsIDI0LCAyLCAyLCAxNSwgMTgsIDIsIDIsIDExLCAyMixcbiAgICAyLCAwLCA2OCwgMTgsIDQsIDAsIDI3LCAxNiwgNCwgMCwgMTksIDI0LCA0LCAwLCAxNSwgMjgsXG4gICAgMiwgMCwgNzgsIDIwLCA0LCAwLCAzMSwgMTgsIDIsIDQsIDE0LCAxOCwgNCwgMSwgMTMsIDI2LFxuICAgIDIsIDAsIDk3LCAyNCwgMiwgMiwgMzgsIDIyLCA0LCAyLCAxOCwgMjIsIDQsIDIsIDE0LCAyNixcbiAgICAyLCAwLCAxMTYsIDMwLCAzLCAyLCAzNiwgMjIsIDQsIDQsIDE2LCAyMCwgNCwgNCwgMTIsIDI0LFxuICAgIDIsIDIsIDY4LCAxOCwgNCwgMSwgNDMsIDI2LCA2LCAyLCAxOSwgMjQsIDYsIDIsIDE1LCAyOCxcbiAgICA0LCAwLCA4MSwgMjAsIDEsIDQsIDUwLCAzMCwgNCwgNCwgMjIsIDI4LCAzLCA4LCAxMiwgMjQsXG4gICAgMiwgMiwgOTIsIDI0LCA2LCAyLCAzNiwgMjIsIDQsIDYsIDIwLCAyNiwgNywgNCwgMTQsIDI4LFxuICAgIDQsIDAsIDEwNywgMjYsIDgsIDEsIDM3LCAyMiwgOCwgNCwgMjAsIDI0LCAxMiwgNCwgMTEsIDIyLFxuICAgIDMsIDEsIDExNSwgMzAsIDQsIDUsIDQwLCAyNCwgMTEsIDUsIDE2LCAyMCwgMTEsIDUsIDEyLCAyNCxcbiAgICA1LCAxLCA4NywgMjIsIDUsIDUsIDQxLCAyNCwgNSwgNywgMjQsIDMwLCAxMSwgNywgMTIsIDI0LFxuICAgIDUsIDEsIDk4LCAyNCwgNywgMywgNDUsIDI4LCAxNSwgMiwgMTksIDI0LCAzLCAxMywgMTUsIDMwLFxuICAgIDEsIDUsIDEwNywgMjgsIDEwLCAxLCA0NiwgMjgsIDEsIDE1LCAyMiwgMjgsIDIsIDE3LCAxNCwgMjgsXG4gICAgNSwgMSwgMTIwLCAzMCwgOSwgNCwgNDMsIDI2LCAxNywgMSwgMjIsIDI4LCAyLCAxOSwgMTQsIDI4LFxuICAgIDMsIDQsIDExMywgMjgsIDMsIDExLCA0NCwgMjYsIDE3LCA0LCAyMSwgMjYsIDksIDE2LCAxMywgMjYsXG4gICAgMywgNSwgMTA3LCAyOCwgMywgMTMsIDQxLCAyNiwgMTUsIDUsIDI0LCAzMCwgMTUsIDEwLCAxNSwgMjgsXG4gICAgNCwgNCwgMTE2LCAyOCwgMTcsIDAsIDQyLCAyNiwgMTcsIDYsIDIyLCAyOCwgMTksIDYsIDE2LCAzMCxcbiAgICAyLCA3LCAxMTEsIDI4LCAxNywgMCwgNDYsIDI4LCA3LCAxNiwgMjQsIDMwLCAzNCwgMCwgMTMsIDI0LFxuICAgIDQsIDUsIDEyMSwgMzAsIDQsIDE0LCA0NywgMjgsIDExLCAxNCwgMjQsIDMwLCAxNiwgMTQsIDE1LCAzMCxcbiAgICA2LCA0LCAxMTcsIDMwLCA2LCAxNCwgNDUsIDI4LCAxMSwgMTYsIDI0LCAzMCwgMzAsIDIsIDE2LCAzMCxcbiAgICA4LCA0LCAxMDYsIDI2LCA4LCAxMywgNDcsIDI4LCA3LCAyMiwgMjQsIDMwLCAyMiwgMTMsIDE1LCAzMCxcbiAgICAxMCwgMiwgMTE0LCAyOCwgMTksIDQsIDQ2LCAyOCwgMjgsIDYsIDIyLCAyOCwgMzMsIDQsIDE2LCAzMCxcbiAgICA4LCA0LCAxMjIsIDMwLCAyMiwgMywgNDUsIDI4LCA4LCAyNiwgMjMsIDMwLCAxMiwgMjgsIDE1LCAzMCxcbiAgICAzLCAxMCwgMTE3LCAzMCwgMywgMjMsIDQ1LCAyOCwgNCwgMzEsIDI0LCAzMCwgMTEsIDMxLCAxNSwgMzAsXG4gICAgNywgNywgMTE2LCAzMCwgMjEsIDcsIDQ1LCAyOCwgMSwgMzcsIDIzLCAzMCwgMTksIDI2LCAxNSwgMzAsXG4gICAgNSwgMTAsIDExNSwgMzAsIDE5LCAxMCwgNDcsIDI4LCAxNSwgMjUsIDI0LCAzMCwgMjMsIDI1LCAxNSwgMzAsXG4gICAgMTMsIDMsIDExNSwgMzAsIDIsIDI5LCA0NiwgMjgsIDQyLCAxLCAyNCwgMzAsIDIzLCAyOCwgMTUsIDMwLFxuICAgIDE3LCAwLCAxMTUsIDMwLCAxMCwgMjMsIDQ2LCAyOCwgMTAsIDM1LCAyNCwgMzAsIDE5LCAzNSwgMTUsIDMwLFxuICAgIDE3LCAxLCAxMTUsIDMwLCAxNCwgMjEsIDQ2LCAyOCwgMjksIDE5LCAyNCwgMzAsIDExLCA0NiwgMTUsIDMwLFxuICAgIDEzLCA2LCAxMTUsIDMwLCAxNCwgMjMsIDQ2LCAyOCwgNDQsIDcsIDI0LCAzMCwgNTksIDEsIDE2LCAzMCxcbiAgICAxMiwgNywgMTIxLCAzMCwgMTIsIDI2LCA0NywgMjgsIDM5LCAxNCwgMjQsIDMwLCAyMiwgNDEsIDE1LCAzMCxcbiAgICA2LCAxNCwgMTIxLCAzMCwgNiwgMzQsIDQ3LCAyOCwgNDYsIDEwLCAyNCwgMzAsIDIsIDY0LCAxNSwgMzAsXG4gICAgMTcsIDQsIDEyMiwgMzAsIDI5LCAxNCwgNDYsIDI4LCA0OSwgMTAsIDI0LCAzMCwgMjQsIDQ2LCAxNSwgMzAsXG4gICAgNCwgMTgsIDEyMiwgMzAsIDEzLCAzMiwgNDYsIDI4LCA0OCwgMTQsIDI0LCAzMCwgNDIsIDMyLCAxNSwgMzAsXG4gICAgMjAsIDQsIDExNywgMzAsIDQwLCA3LCA0NywgMjgsIDQzLCAyMiwgMjQsIDMwLCAxMCwgNjcsIDE1LCAzMCxcbiAgICAxOSwgNiwgMTE4LCAzMCwgMTgsIDMxLCA0NywgMjgsIDM0LCAzNCwgMjQsIDMwLCAyMCwgNjEsIDE1LCAzMFxuICBdO1xuXG4gIC8vIEdhbG9pcyBmaWVsZCBsb2cgdGFibGVcbiAgdmFyIGdsb2cgPSBbXG4gICAgMHhmZiwgMHgwMCwgMHgwMSwgMHgxOSwgMHgwMiwgMHgzMiwgMHgxYSwgMHhjNiwgMHgwMywgMHhkZiwgMHgzMywgMHhlZSwgMHgxYiwgMHg2OCwgMHhjNywgMHg0YixcbiAgICAweDA0LCAweDY0LCAweGUwLCAweDBlLCAweDM0LCAweDhkLCAweGVmLCAweDgxLCAweDFjLCAweGMxLCAweDY5LCAweGY4LCAweGM4LCAweDA4LCAweDRjLCAweDcxLFxuICAgIDB4MDUsIDB4OGEsIDB4NjUsIDB4MmYsIDB4ZTEsIDB4MjQsIDB4MGYsIDB4MjEsIDB4MzUsIDB4OTMsIDB4OGUsIDB4ZGEsIDB4ZjAsIDB4MTIsIDB4ODIsIDB4NDUsXG4gICAgMHgxZCwgMHhiNSwgMHhjMiwgMHg3ZCwgMHg2YSwgMHgyNywgMHhmOSwgMHhiOSwgMHhjOSwgMHg5YSwgMHgwOSwgMHg3OCwgMHg0ZCwgMHhlNCwgMHg3MiwgMHhhNixcbiAgICAweDA2LCAweGJmLCAweDhiLCAweDYyLCAweDY2LCAweGRkLCAweDMwLCAweGZkLCAweGUyLCAweDk4LCAweDI1LCAweGIzLCAweDEwLCAweDkxLCAweDIyLCAweDg4LFxuICAgIDB4MzYsIDB4ZDAsIDB4OTQsIDB4Y2UsIDB4OGYsIDB4OTYsIDB4ZGIsIDB4YmQsIDB4ZjEsIDB4ZDIsIDB4MTMsIDB4NWMsIDB4ODMsIDB4MzgsIDB4NDYsIDB4NDAsXG4gICAgMHgxZSwgMHg0MiwgMHhiNiwgMHhhMywgMHhjMywgMHg0OCwgMHg3ZSwgMHg2ZSwgMHg2YiwgMHgzYSwgMHgyOCwgMHg1NCwgMHhmYSwgMHg4NSwgMHhiYSwgMHgzZCxcbiAgICAweGNhLCAweDVlLCAweDliLCAweDlmLCAweDBhLCAweDE1LCAweDc5LCAweDJiLCAweDRlLCAweGQ0LCAweGU1LCAweGFjLCAweDczLCAweGYzLCAweGE3LCAweDU3LFxuICAgIDB4MDcsIDB4NzAsIDB4YzAsIDB4ZjcsIDB4OGMsIDB4ODAsIDB4NjMsIDB4MGQsIDB4NjcsIDB4NGEsIDB4ZGUsIDB4ZWQsIDB4MzEsIDB4YzUsIDB4ZmUsIDB4MTgsXG4gICAgMHhlMywgMHhhNSwgMHg5OSwgMHg3NywgMHgyNiwgMHhiOCwgMHhiNCwgMHg3YywgMHgxMSwgMHg0NCwgMHg5MiwgMHhkOSwgMHgyMywgMHgyMCwgMHg4OSwgMHgyZSxcbiAgICAweDM3LCAweDNmLCAweGQxLCAweDViLCAweDk1LCAweGJjLCAweGNmLCAweGNkLCAweDkwLCAweDg3LCAweDk3LCAweGIyLCAweGRjLCAweGZjLCAweGJlLCAweDYxLFxuICAgIDB4ZjIsIDB4NTYsIDB4ZDMsIDB4YWIsIDB4MTQsIDB4MmEsIDB4NWQsIDB4OWUsIDB4ODQsIDB4M2MsIDB4MzksIDB4NTMsIDB4NDcsIDB4NmQsIDB4NDEsIDB4YTIsXG4gICAgMHgxZiwgMHgyZCwgMHg0MywgMHhkOCwgMHhiNywgMHg3YiwgMHhhNCwgMHg3NiwgMHhjNCwgMHgxNywgMHg0OSwgMHhlYywgMHg3ZiwgMHgwYywgMHg2ZiwgMHhmNixcbiAgICAweDZjLCAweGExLCAweDNiLCAweDUyLCAweDI5LCAweDlkLCAweDU1LCAweGFhLCAweGZiLCAweDYwLCAweDg2LCAweGIxLCAweGJiLCAweGNjLCAweDNlLCAweDVhLFxuICAgIDB4Y2IsIDB4NTksIDB4NWYsIDB4YjAsIDB4OWMsIDB4YTksIDB4YTAsIDB4NTEsIDB4MGIsIDB4ZjUsIDB4MTYsIDB4ZWIsIDB4N2EsIDB4NzUsIDB4MmMsIDB4ZDcsXG4gICAgMHg0ZiwgMHhhZSwgMHhkNSwgMHhlOSwgMHhlNiwgMHhlNywgMHhhZCwgMHhlOCwgMHg3NCwgMHhkNiwgMHhmNCwgMHhlYSwgMHhhOCwgMHg1MCwgMHg1OCwgMHhhZlxuICBdO1xuXG4gIC8vIEdhbGlvcyBmaWVsZCBleHBvbmVudCB0YWJsZVxuICB2YXIgZ2V4cCA9IFtcbiAgICAweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFkLCAweDNhLCAweDc0LCAweGU4LCAweGNkLCAweDg3LCAweDEzLCAweDI2LFxuICAgIDB4NGMsIDB4OTgsIDB4MmQsIDB4NWEsIDB4YjQsIDB4NzUsIDB4ZWEsIDB4YzksIDB4OGYsIDB4MDMsIDB4MDYsIDB4MGMsIDB4MTgsIDB4MzAsIDB4NjAsIDB4YzAsXG4gICAgMHg5ZCwgMHgyNywgMHg0ZSwgMHg5YywgMHgyNSwgMHg0YSwgMHg5NCwgMHgzNSwgMHg2YSwgMHhkNCwgMHhiNSwgMHg3NywgMHhlZSwgMHhjMSwgMHg5ZiwgMHgyMyxcbiAgICAweDQ2LCAweDhjLCAweDA1LCAweDBhLCAweDE0LCAweDI4LCAweDUwLCAweGEwLCAweDVkLCAweGJhLCAweDY5LCAweGQyLCAweGI5LCAweDZmLCAweGRlLCAweGExLFxuICAgIDB4NWYsIDB4YmUsIDB4NjEsIDB4YzIsIDB4OTksIDB4MmYsIDB4NWUsIDB4YmMsIDB4NjUsIDB4Y2EsIDB4ODksIDB4MGYsIDB4MWUsIDB4M2MsIDB4NzgsIDB4ZjAsXG4gICAgMHhmZCwgMHhlNywgMHhkMywgMHhiYiwgMHg2YiwgMHhkNiwgMHhiMSwgMHg3ZiwgMHhmZSwgMHhlMSwgMHhkZiwgMHhhMywgMHg1YiwgMHhiNiwgMHg3MSwgMHhlMixcbiAgICAweGQ5LCAweGFmLCAweDQzLCAweDg2LCAweDExLCAweDIyLCAweDQ0LCAweDg4LCAweDBkLCAweDFhLCAweDM0LCAweDY4LCAweGQwLCAweGJkLCAweDY3LCAweGNlLFxuICAgIDB4ODEsIDB4MWYsIDB4M2UsIDB4N2MsIDB4ZjgsIDB4ZWQsIDB4YzcsIDB4OTMsIDB4M2IsIDB4NzYsIDB4ZWMsIDB4YzUsIDB4OTcsIDB4MzMsIDB4NjYsIDB4Y2MsXG4gICAgMHg4NSwgMHgxNywgMHgyZSwgMHg1YywgMHhiOCwgMHg2ZCwgMHhkYSwgMHhhOSwgMHg0ZiwgMHg5ZSwgMHgyMSwgMHg0MiwgMHg4NCwgMHgxNSwgMHgyYSwgMHg1NCxcbiAgICAweGE4LCAweDRkLCAweDlhLCAweDI5LCAweDUyLCAweGE0LCAweDU1LCAweGFhLCAweDQ5LCAweDkyLCAweDM5LCAweDcyLCAweGU0LCAweGQ1LCAweGI3LCAweDczLFxuICAgIDB4ZTYsIDB4ZDEsIDB4YmYsIDB4NjMsIDB4YzYsIDB4OTEsIDB4M2YsIDB4N2UsIDB4ZmMsIDB4ZTUsIDB4ZDcsIDB4YjMsIDB4N2IsIDB4ZjYsIDB4ZjEsIDB4ZmYsXG4gICAgMHhlMywgMHhkYiwgMHhhYiwgMHg0YiwgMHg5NiwgMHgzMSwgMHg2MiwgMHhjNCwgMHg5NSwgMHgzNywgMHg2ZSwgMHhkYywgMHhhNSwgMHg1NywgMHhhZSwgMHg0MSxcbiAgICAweDgyLCAweDE5LCAweDMyLCAweDY0LCAweGM4LCAweDhkLCAweDA3LCAweDBlLCAweDFjLCAweDM4LCAweDcwLCAweGUwLCAweGRkLCAweGE3LCAweDUzLCAweGE2LFxuICAgIDB4NTEsIDB4YTIsIDB4NTksIDB4YjIsIDB4NzksIDB4ZjIsIDB4ZjksIDB4ZWYsIDB4YzMsIDB4OWIsIDB4MmIsIDB4NTYsIDB4YWMsIDB4NDUsIDB4OGEsIDB4MDksXG4gICAgMHgxMiwgMHgyNCwgMHg0OCwgMHg5MCwgMHgzZCwgMHg3YSwgMHhmNCwgMHhmNSwgMHhmNywgMHhmMywgMHhmYiwgMHhlYiwgMHhjYiwgMHg4YiwgMHgwYiwgMHgxNixcbiAgICAweDJjLCAweDU4LCAweGIwLCAweDdkLCAweGZhLCAweGU5LCAweGNmLCAweDgzLCAweDFiLCAweDM2LCAweDZjLCAweGQ4LCAweGFkLCAweDQ3LCAweDhlLCAweDAwXG4gIF07XG4gIHZhciBiYXNlNjRFbmNvZGVDaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuICAgIHZhciBiYXNlNjREZWNvZGVDaGFycyA9IG5ldyBBcnJheSgtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgNjIsIC0xLCAtMSwgLTEsIDYzLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLCA2MSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCwgNTEsIC0xLCAtMSwgLTEsIC0xLCAtMSk7XG4gIC8vIFdvcmtpbmcgYnVmZmVyczpcbiAgLy8gZGF0YSBpbnB1dCBhbmQgZWNjIGFwcGVuZCwgaW1hZ2Ugd29ya2luZyBidWZmZXIsIGZpeGVkIHBhcnQgb2YgaW1hZ2UsIHJ1biBsZW5ndGhzIGZvciBiYWRuZXNzXG4gIHZhciBzdHJpbmJ1ZiA9IFtdLCBlY2NidWYgPSBbXSwgcXJmcmFtZSA9IFtdLCBmcmFtYXNrID0gW10sIHJsZW5zID0gW107XG4gIC8vIENvbnRyb2wgdmFsdWVzIC0gd2lkdGggaXMgYmFzZWQgb24gdmVyc2lvbiwgbGFzdCA0IGFyZSBmcm9tIHRhYmxlLlxuICB2YXIgdmVyc2lvbiwgd2lkdGgsIG5lY2NibGsxLCBuZWNjYmxrMiwgZGF0YWJsa3csIGVjY2Jsa3dpZDtcbiAgdmFyIGVjY2xldmVsID0gMjtcbiAgLy8gc2V0IGJpdCB0byBpbmRpY2F0ZSBjZWxsIGluIHFyZnJhbWUgaXMgaW1tdXRhYmxlLiAgc3ltbWV0cmljIGFyb3VuZCBkaWFnb25hbFxuICBmdW5jdGlvbiBzZXRtYXNrKHgsIHkpIHtcbiAgICB2YXIgYnQ7XG4gICAgaWYgKHggPiB5KSB7XG4gICAgICBidCA9IHg7XG4gICAgICB4ID0geTtcbiAgICAgIHkgPSBidDtcbiAgICB9XG4gICAgLy8geSp5ID0gMSszKzUuLi5cbiAgICBidCA9IHk7XG4gICAgYnQgKj0geTtcbiAgICBidCArPSB5O1xuICAgIGJ0ID4+PSAxO1xuICAgIGJ0ICs9IHg7XG4gICAgZnJhbWFza1tidF0gPSAxO1xuICB9XG5cbiAgLy8gZW50ZXIgYWxpZ25tZW50IHBhdHRlcm4gLSBibGFjayB0byBxcmZyYW1lLCB3aGl0ZSB0byBtYXNrIChsYXRlciBibGFjayBmcmFtZSBtZXJnZWQgdG8gbWFzaylcbiAgZnVuY3Rpb24gcHV0YWxpZ24oeCwgeSkge1xuICAgIHZhciBqO1xuXG4gICAgcXJmcmFtZVt4ICsgd2lkdGggKiB5XSA9IDE7XG4gICAgZm9yIChqID0gLTI7IGogPCAyOyBqKyspIHtcbiAgICAgIHFyZnJhbWVbKHggKyBqKSArIHdpZHRoICogKHkgLSAyKV0gPSAxO1xuICAgICAgcXJmcmFtZVsoeCAtIDIpICsgd2lkdGggKiAoeSArIGogKyAxKV0gPSAxO1xuICAgICAgcXJmcmFtZVsoeCArIDIpICsgd2lkdGggKiAoeSArIGopXSA9IDE7XG4gICAgICBxcmZyYW1lWyh4ICsgaiArIDEpICsgd2lkdGggKiAoeSArIDIpXSA9IDE7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgIHNldG1hc2soeCAtIDEsIHkgKyBqKTtcbiAgICAgIHNldG1hc2soeCArIDEsIHkgLSBqKTtcbiAgICAgIHNldG1hc2soeCAtIGosIHkgLSAxKTtcbiAgICAgIHNldG1hc2soeCArIGosIHkgKyAxKTtcbiAgICB9XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBSZWVkIFNvbG9tb24gZXJyb3IgY29ycmVjdGlvblxuICAvLyBleHBvbmVudGlhdGlvbiBtb2QgTlxuICBmdW5jdGlvbiBtb2Rubih4KSB7XG4gICAgd2hpbGUgKHggPj0gMjU1KSB7XG4gICAgICB4IC09IDI1NTtcbiAgICAgIHggPSAoeCA+PiA4KSArICh4ICYgMjU1KTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB2YXIgZ2VucG9seSA9IFtdO1xuXG4gIC8vIENhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQyBkYXRhIHRvIGRhdGEgYmxvY2suICBCbG9jayBpcyBpbiBzdHJpbmJ1ZiwgaW5kZXhlcyB0byBidWZmZXJzIGdpdmVuLlxuICBmdW5jdGlvbiBhcHBlbmRycyhkYXRhLCBkbGVuLCBlY2J1ZiwgZWNsZW4pIHtcbiAgICB2YXIgaSwgaiwgZmI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZWNsZW47IGkrKylcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgaV0gPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBkbGVuOyBpKyspIHtcbiAgICAgIGZiID0gZ2xvZ1tzdHJpbmJ1ZltkYXRhICsgaV0gXiBzdHJpbmJ1ZltlY2J1Zl1dO1xuICAgICAgaWYgKGZiICE9IDI1NSkgICAgIC8qIGZiIHRlcm0gaXMgbm9uLXplcm8gKi9cbiAgICAgICAgZm9yIChqID0gMTsgaiA8IGVjbGVuOyBqKyspXG4gICAgICAgICAgc3RyaW5idWZbZWNidWYgKyBqIC0gMV0gPSBzdHJpbmJ1ZltlY2J1ZiArIGpdIF4gZ2V4cFttb2RubihmYiArIGdlbnBvbHlbZWNsZW4gLSBqXSldO1xuICAgICAgZWxzZVxuICAgICAgICBmb3IgKGogPSBlY2J1ZjsgaiA8IGVjYnVmICsgZWNsZW47IGorKylcbiAgICAgICAgICBzdHJpbmJ1ZltqXSA9IHN0cmluYnVmW2ogKyAxXTtcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgZWNsZW4gLSAxXSA9IGZiID09IDI1NSA/IDAgOiBnZXhwW21vZG5uKGZiICsgZ2VucG9seVswXSldO1xuICAgIH1cbiAgfVxuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEZyYW1lIGRhdGEgaW5zZXJ0IGZvbGxvd2luZyB0aGUgcGF0aCBydWxlc1xuXG4gIC8vIGNoZWNrIG1hc2sgLSBzaW5jZSBzeW1tZXRyaWNhbCB1c2UgaGFsZi5cbiAgZnVuY3Rpb24gaXNtYXNrZWQoeCwgeSkge1xuICAgIHZhciBidDtcbiAgICBpZiAoeCA+IHkpIHtcbiAgICAgIGJ0ID0geDtcbiAgICAgIHggPSB5O1xuICAgICAgeSA9IGJ0O1xuICAgIH1cbiAgICBidCA9IHk7XG4gICAgYnQgKz0geSAqIHk7XG4gICAgYnQgPj49IDE7XG4gICAgYnQgKz0geDtcbiAgICByZXR1cm4gZnJhbWFza1tidF07XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyAgQXBwbHkgdGhlIHNlbGVjdGVkIG1hc2sgb3V0IG9mIHRoZSA4LlxuICBmdW5jdGlvbiBhcHBseW1hc2sobSkge1xuICAgIHZhciB4LCB5LCByM3gsIHIzeTtcblxuICAgIHN3aXRjaCAobSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcbiAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKylcbiAgICAgICAgICAgIGlmICghKCh4ICsgeSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxuICAgICAgICAgICAgaWYgKCEoeSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCFyM3ggJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSByM3ksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XG4gICAgICAgICAgICBpZiAocjN4ID09IDMpXG4gICAgICAgICAgICAgIHIzeCA9IDA7XG4gICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgIGZvciAocjN4ID0gMCwgcjN5ID0gKCh5ID4+IDEpICYgMSksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XG4gICAgICAgICAgICBpZiAocjN4ID09IDMpIHtcbiAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgICAgcjN5ID0gIXIzeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcjN5ICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrICwgcjN5KyspIHtcbiAgICAgICAgICBpZiAocjN5ID09IDMpXG4gICAgICAgICAgICByM3kgPSAwO1xuICAgICAgICAgIGZvciAocjN4ID0gMCwgeCA9IDA7IHggPCB3aWR0aDsgeCsrICwgcjN4KyspIHtcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcbiAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgIGlmICghKCh4ICYgeSAmIDEpICsgISghcjN4IHwgIXIzeSkpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCEoKCh4ICYgeSAmIDEpICsgKHIzeCAmJiAocjN4ID09IHIzeSkpKSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xuICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xuICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgaWYgKCEoKChyM3ggJiYgKHIzeCA9PSByM3kpKSArICgoeCArIHkpICYgMSkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBCYWRuZXNzIGNvZWZmaWNpZW50cy5cbiAgdmFyIE4xID0gMywgTjIgPSAzLCBOMyA9IDQwLCBONCA9IDEwO1xuXG4gIC8vIFVzaW5nIHRoZSB0YWJsZSBvZiB0aGUgbGVuZ3RoIG9mIGVhY2ggcnVuLCBjYWxjdWxhdGUgdGhlIGFtb3VudCBvZiBiYWQgaW1hZ2VcbiAgLy8gLSBsb25nIHJ1bnMgb3IgdGhvc2UgdGhhdCBsb29rIGxpa2UgZmluZGVyczsgY2FsbGVkIHR3aWNlLCBvbmNlIGVhY2ggZm9yIFggYW5kIFlcbiAgZnVuY3Rpb24gYmFkcnVucyhsZW5ndGgpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgcnVuc2JhZCA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8PSBsZW5ndGg7IGkrKylcbiAgICAgIGlmIChybGVuc1tpXSA+PSA1KVxuICAgICAgICBydW5zYmFkICs9IE4xICsgcmxlbnNbaV0gLSA1O1xuICAgIC8vIEJ3QkJCd0IgYXMgaW4gZmluZGVyXG4gICAgZm9yIChpID0gMzsgaSA8IGxlbmd0aCAtIDE7IGkgKz0gMilcbiAgICAgIGlmIChybGVuc1tpIC0gMl0gPT0gcmxlbnNbaSArIDJdXG4gICAgICAgICYmIHJsZW5zW2kgKyAyXSA9PSBybGVuc1tpIC0gMV1cbiAgICAgICAgJiYgcmxlbnNbaSAtIDFdID09IHJsZW5zW2kgKyAxXVxuICAgICAgICAmJiBybGVuc1tpIC0gMV0gKiAzID09IHJsZW5zW2ldXG4gICAgICAgIC8vIHdoaXRlIGFyb3VuZCB0aGUgYmxhY2sgcGF0dGVybj8gTm90IHBhcnQgb2Ygc3BlY1xuICAgICAgICAmJiAocmxlbnNbaSAtIDNdID09IDAgLy8gYmVnaW5uaW5nXG4gICAgICAgICAgfHwgaSArIDMgPiBsZW5ndGggIC8vIGVuZFxuICAgICAgICAgIHx8IHJsZW5zW2kgLSAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0IHx8IHJsZW5zW2kgKyAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0KVxuICAgICAgKVxuICAgICAgICBydW5zYmFkICs9IE4zO1xuICAgIHJldHVybiBydW5zYmFkO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIGhvdyBiYWQgdGhlIG1hc2tlZCBpbWFnZSBpcyAtIGJsb2NrcywgaW1iYWxhbmNlLCBydW5zLCBvciBmaW5kZXJzLlxuICBmdW5jdGlvbiBiYWRjaGVjaygpIHtcbiAgICB2YXIgeCwgeSwgaCwgYiwgYjE7XG4gICAgdmFyIHRoaXNiYWQgPSAwO1xuICAgIHZhciBidyA9IDA7XG5cbiAgICAvLyBibG9ja3Mgb2Ygc2FtZSBjb2xvci5cbiAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGggLSAxOyB5KyspXG4gICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGggLSAxOyB4KyspXG4gICAgICAgIGlmICgocXJmcmFtZVt4ICsgd2lkdGggKiB5XSAmJiBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqIHldXG4gICAgICAgICAgJiYgcXJmcmFtZVt4ICsgd2lkdGggKiAoeSArIDEpXSAmJiBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqICh5ICsgMSldKSAvLyBhbGwgYmxhY2tcbiAgICAgICAgICB8fCAhKHFyZnJhbWVbeCArIHdpZHRoICogeV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiB5XVxuICAgICAgICAgICAgfHwgcXJmcmFtZVt4ICsgd2lkdGggKiAoeSArIDEpXSB8fCBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqICh5ICsgMSldKSkgLy8gYWxsIHdoaXRlXG4gICAgICAgICAgdGhpc2JhZCArPSBOMjtcblxuICAgIC8vIFggcnVuc1xuICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKSB7XG4gICAgICBybGVuc1swXSA9IDA7XG4gICAgICBmb3IgKGggPSBiID0geCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIGlmICgoYjEgPSBxcmZyYW1lW3ggKyB3aWR0aCAqIHldKSA9PSBiKVxuICAgICAgICAgIHJsZW5zW2hdKys7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBybGVuc1srK2hdID0gMTtcbiAgICAgICAgYiA9IGIxO1xuICAgICAgICBidyArPSBiID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgdGhpc2JhZCArPSBiYWRydW5zKGgpO1xuICAgIH1cblxuICAgIC8vIGJsYWNrL3doaXRlIGltYmFsYW5jZVxuICAgIGlmIChidyA8IDApXG4gICAgICBidyA9IC1idztcblxuICAgIHZhciBiaWcgPSBidztcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIGJpZyArPSBiaWcgPDwgMjtcbiAgICBiaWcgPDw9IDE7XG4gICAgd2hpbGUgKGJpZyA+IHdpZHRoICogd2lkdGgpXG4gICAgICBiaWcgLT0gd2lkdGggKiB3aWR0aCwgY291bnQrKztcbiAgICB0aGlzYmFkICs9IGNvdW50ICogTjQ7XG5cbiAgICAvLyBZIHJ1bnNcbiAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgcmxlbnNbMF0gPSAwO1xuICAgICAgZm9yIChoID0gYiA9IHkgPSAwOyB5IDwgd2lkdGg7IHkrKykge1xuICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcbiAgICAgICAgICBybGVuc1toXSsrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmxlbnNbKytoXSA9IDE7XG4gICAgICAgIGIgPSBiMTtcbiAgICAgIH1cbiAgICAgIHRoaXNiYWQgKz0gYmFkcnVucyhoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNiYWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5mcmFtZShpbnN0cmluZykge1xuICAgIHZhciB4LCB5LCBrLCB0LCB2LCBpLCBqLCBtO1xuXG4gICAgLy8gZmluZCB0aGUgc21hbGxlc3QgdmVyc2lvbiB0aGF0IGZpdHMgdGhlIHN0cmluZ1xuICAgIHQgPSBpbnN0cmluZy5sZW5ndGg7XG4gICAgdmVyc2lvbiA9IDA7XG4gICAgZG8ge1xuICAgICAgdmVyc2lvbisrO1xuICAgICAgayA9IChlY2NsZXZlbCAtIDEpICogNCArICh2ZXJzaW9uIC0gMSkgKiAxNjtcbiAgICAgIG5lY2NibGsxID0gZWNjYmxvY2tzW2srK107XG4gICAgICBuZWNjYmxrMiA9IGVjY2Jsb2Nrc1trKytdO1xuICAgICAgZGF0YWJsa3cgPSBlY2NibG9ja3NbaysrXTtcbiAgICAgIGVjY2Jsa3dpZCA9IGVjY2Jsb2Nrc1trXTtcbiAgICAgIGsgPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyIC0gMyArICh2ZXJzaW9uIDw9IDkpO1xuICAgICAgaWYgKHQgPD0gaylcbiAgICAgICAgYnJlYWs7XG4gICAgfSB3aGlsZSAodmVyc2lvbiA8IDQwKTtcblxuICAgIC8vIEZJWE1FIC0gaW5zdXJlIHRoYXQgaXQgZml0cyBpbnN0ZWQgb2YgYmVpbmcgdHJ1bmNhdGVkXG4gICAgd2lkdGggPSAxNyArIDQgKiB2ZXJzaW9uO1xuXG4gICAgLy8gYWxsb2NhdGUsIGNsZWFyIGFuZCBzZXR1cCBkYXRhIHN0cnVjdHVyZXNcbiAgICB2ID0gZGF0YWJsa3cgKyAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XG4gICAgZm9yICh0ID0gMDsgdCA8IHY7IHQrKylcbiAgICAgIGVjY2J1Zlt0XSA9IDA7XG4gICAgc3RyaW5idWYgPSBpbnN0cmluZy5zbGljZSgwKTtcblxuICAgIGZvciAodCA9IDA7IHQgPCB3aWR0aCAqIHdpZHRoOyB0KyspXG4gICAgICBxcmZyYW1lW3RdID0gMDtcblxuICAgIGZvciAodCA9IDA7IHQgPCAod2lkdGggKiAod2lkdGggKyAxKSArIDEpIC8gMjsgdCsrKVxuICAgICAgZnJhbWFza1t0XSA9IDA7XG5cbiAgICAvLyBpbnNlcnQgZmluZGVycyAtIGJsYWNrIHRvIGZyYW1lLCB3aGl0ZSB0byBtYXNrXG4gICAgZm9yICh0ID0gMDsgdCA8IDM7IHQrKykge1xuICAgICAgayA9IDA7XG4gICAgICB5ID0gMDtcbiAgICAgIGlmICh0ID09IDEpXG4gICAgICAgIGsgPSAod2lkdGggLSA3KTtcbiAgICAgIGlmICh0ID09IDIpXG4gICAgICAgIHkgPSAod2lkdGggLSA3KTtcbiAgICAgIHFyZnJhbWVbKHkgKyAzKSArIHdpZHRoICogKGsgKyAzKV0gPSAxO1xuICAgICAgZm9yICh4ID0gMDsgeCA8IDY7IHgrKykge1xuICAgICAgICBxcmZyYW1lWyh5ICsgeCkgKyB3aWR0aCAqIGtdID0gMTtcbiAgICAgICAgcXJmcmFtZVt5ICsgd2lkdGggKiAoayArIHggKyAxKV0gPSAxO1xuICAgICAgICBxcmZyYW1lWyh5ICsgNikgKyB3aWR0aCAqIChrICsgeCldID0gMTtcbiAgICAgICAgcXJmcmFtZVsoeSArIHggKyAxKSArIHdpZHRoICogKGsgKyA2KV0gPSAxO1xuICAgICAgfVxuICAgICAgZm9yICh4ID0gMTsgeCA8IDU7IHgrKykge1xuICAgICAgICBzZXRtYXNrKHkgKyB4LCBrICsgMSk7XG4gICAgICAgIHNldG1hc2soeSArIDEsIGsgKyB4ICsgMSk7XG4gICAgICAgIHNldG1hc2soeSArIDUsIGsgKyB4KTtcbiAgICAgICAgc2V0bWFzayh5ICsgeCArIDEsIGsgKyA1KTtcbiAgICAgIH1cbiAgICAgIGZvciAoeCA9IDI7IHggPCA0OyB4KyspIHtcbiAgICAgICAgcXJmcmFtZVsoeSArIHgpICsgd2lkdGggKiAoayArIDIpXSA9IDE7XG4gICAgICAgIHFyZnJhbWVbKHkgKyAyKSArIHdpZHRoICogKGsgKyB4ICsgMSldID0gMTtcbiAgICAgICAgcXJmcmFtZVsoeSArIDQpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XG4gICAgICAgIHFyZnJhbWVbKHkgKyB4ICsgMSkgKyB3aWR0aCAqIChrICsgNCldID0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhbGlnbm1lbnQgYmxvY2tzXG4gICAgaWYgKHZlcnNpb24gPiAxKSB7XG4gICAgICB0ID0gYWRlbHRhW3ZlcnNpb25dO1xuICAgICAgeSA9IHdpZHRoIC0gNztcbiAgICAgIGZvciAoOyA7KSB7XG4gICAgICAgIHggPSB3aWR0aCAtIDc7XG4gICAgICAgIHdoaWxlICh4ID4gdCAtIDMpIHtcbiAgICAgICAgICBwdXRhbGlnbih4LCB5KTtcbiAgICAgICAgICBpZiAoeCA8IHQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB4IC09IHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgPD0gdCArIDkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIHkgLT0gdDtcbiAgICAgICAgcHV0YWxpZ24oNiwgeSk7XG4gICAgICAgIHB1dGFsaWduKHksIDYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNpbmdsZSBibGFja1xuICAgIHFyZnJhbWVbOCArIHdpZHRoICogKHdpZHRoIC0gOCldID0gMTtcblxuICAgIC8vIHRpbWluZyBnYXAgLSBtYXNrIG9ubHlcbiAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKSB7XG4gICAgICBzZXRtYXNrKDcsIHkpO1xuICAgICAgc2V0bWFzayh3aWR0aCAtIDgsIHkpO1xuICAgICAgc2V0bWFzayg3LCB5ICsgd2lkdGggLSA3KTtcbiAgICB9XG4gICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgc2V0bWFzayh4LCA3KTtcbiAgICAgIHNldG1hc2soeCArIHdpZHRoIC0gOCwgNyk7XG4gICAgICBzZXRtYXNrKHgsIHdpZHRoIC0gOCk7XG4gICAgfVxuXG4gICAgLy8gcmVzZXJ2ZSBtYXNrLWZvcm1hdCBhcmVhXG4gICAgZm9yICh4ID0gMDsgeCA8IDk7IHgrKylcbiAgICAgIHNldG1hc2soeCwgOCk7XG4gICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgc2V0bWFzayh4ICsgd2lkdGggLSA4LCA4KTtcbiAgICAgIHNldG1hc2soOCwgeCk7XG4gICAgfVxuICAgIGZvciAoeSA9IDA7IHkgPCA3OyB5KyspXG4gICAgICBzZXRtYXNrKDgsIHkgKyB3aWR0aCAtIDcpO1xuXG4gICAgLy8gdGltaW5nIHJvdy9jb2xcbiAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGggLSAxNDsgeCsrKVxuICAgICAgaWYgKHggJiAxKSB7XG4gICAgICAgIHNldG1hc2soOCArIHgsIDYpO1xuICAgICAgICBzZXRtYXNrKDYsIDggKyB4KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBxcmZyYW1lWyg4ICsgeCkgKyB3aWR0aCAqIDZdID0gMTtcbiAgICAgICAgcXJmcmFtZVs2ICsgd2lkdGggKiAoOCArIHgpXSA9IDE7XG4gICAgICB9XG5cbiAgICAvLyB2ZXJzaW9uIGJsb2NrXG4gICAgaWYgKHZlcnNpb24gPiA2KSB7XG4gICAgICB0ID0gdnBhdFt2ZXJzaW9uIC0gN107XG4gICAgICBrID0gMTc7XG4gICAgICBmb3IgKHggPSAwOyB4IDwgNjsgeCsrKVxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgMzsgeSsrICwgay0tKVxuICAgICAgICAgIGlmICgxICYgKGsgPiAxMSA/IHZlcnNpb24gPj4gKGsgLSAxMikgOiB0ID4+IGspKSB7XG4gICAgICAgICAgICBxcmZyYW1lWyg1IC0geCkgKyB3aWR0aCAqICgyIC0geSArIHdpZHRoIC0gMTEpXSA9IDE7XG4gICAgICAgICAgICBxcmZyYW1lWygyIC0geSArIHdpZHRoIC0gMTEpICsgd2lkdGggKiAoNSAtIHgpXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0bWFzayg1IC0geCwgMiAtIHkgKyB3aWR0aCAtIDExKTtcbiAgICAgICAgICAgIHNldG1hc2soMiAtIHkgKyB3aWR0aCAtIDExLCA1IC0geCk7XG4gICAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN5bmMgbWFzayBiaXRzIC0gb25seSBzZXQgYWJvdmUgZm9yIHdoaXRlIHNwYWNlcywgc28gYWRkIGluIGJsYWNrIGJpdHNcbiAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcbiAgICAgIGZvciAoeCA9IDA7IHggPD0geTsgeCsrKVxuICAgICAgICBpZiAocXJmcmFtZVt4ICsgd2lkdGggKiB5XSlcbiAgICAgICAgICBzZXRtYXNrKHgsIHkpO1xuXG4gICAgLy8gY29udmVydCBzdHJpbmcgdG8gYml0c3RyZWFtXG4gICAgLy8gOCBiaXQgZGF0YSB0byBRUi1jb2RlZCA4IGJpdCBkYXRhIChudW1lcmljIG9yIGFscGhhbnVtLCBvciBrYW5qaSBub3Qgc3VwcG9ydGVkKVxuICAgIHYgPSBzdHJpbmJ1Zi5sZW5ndGg7XG5cbiAgICAvLyBzdHJpbmcgdG8gYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgdjsgaSsrKVxuICAgICAgZWNjYnVmW2ldID0gc3RyaW5idWYuY2hhckNvZGVBdChpKTtcbiAgICBzdHJpbmJ1ZiA9IGVjY2J1Zi5zbGljZSgwKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBtYXggc3RyaW5nIGxlbmd0aFxuICAgIHggPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyO1xuICAgIGlmICh2ID49IHggLSAyKSB7XG4gICAgICB2ID0geCAtIDI7XG4gICAgICBpZiAodmVyc2lvbiA+IDkpXG4gICAgICAgIHYtLTtcbiAgICB9XG5cbiAgICAvLyBzaGlmdCBhbmQgcmVwYWNrIHRvIGluc2VydCBsZW5ndGggcHJlZml4XG4gICAgaSA9IHY7XG4gICAgaWYgKHZlcnNpb24gPiA5KSB7XG4gICAgICBzdHJpbmJ1ZltpICsgMl0gPSAwO1xuICAgICAgc3RyaW5idWZbaSArIDNdID0gMDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdCA9IHN0cmluYnVmW2ldO1xuICAgICAgICBzdHJpbmJ1ZltpICsgM10gfD0gMjU1ICYgKHQgPDwgNCk7XG4gICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IHQgPj4gNDtcbiAgICAgIH1cbiAgICAgIHN0cmluYnVmWzJdIHw9IDI1NSAmICh2IDw8IDQpO1xuICAgICAgc3RyaW5idWZbMV0gPSB2ID4+IDQ7XG4gICAgICBzdHJpbmJ1ZlswXSA9IDB4NDAgfCAodiA+PiAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RyaW5idWZbaSArIDFdID0gMDtcbiAgICAgIHN0cmluYnVmW2kgKyAyXSA9IDA7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcbiAgICAgICAgc3RyaW5idWZbaSArIDJdIHw9IDI1NSAmICh0IDw8IDQpO1xuICAgICAgICBzdHJpbmJ1ZltpICsgMV0gPSB0ID4+IDQ7XG4gICAgICB9XG4gICAgICBzdHJpbmJ1ZlsxXSB8PSAyNTUgJiAodiA8PCA0KTtcbiAgICAgIHN0cmluYnVmWzBdID0gMHg0MCB8ICh2ID4+IDQpO1xuICAgIH1cbiAgICAvLyBmaWxsIHRvIGVuZCB3aXRoIHBhZCBwYXR0ZXJuXG4gICAgaSA9IHYgKyAzIC0gKHZlcnNpb24gPCAxMCk7XG4gICAgd2hpbGUgKGkgPCB4KSB7XG4gICAgICBzdHJpbmJ1ZltpKytdID0gMHhlYztcbiAgICAgIC8vIGJ1ZmZlciBoYXMgcm9vbSAgICBpZiAoaSA9PSB4KSAgICAgIGJyZWFrO1xuICAgICAgc3RyaW5idWZbaSsrXSA9IDB4MTE7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIGFuZCBhcHBlbmQgRUNDXG5cbiAgICAvLyBjYWxjdWxhdGUgZ2VuZXJhdG9yIHBvbHlub21pYWxcbiAgICBnZW5wb2x5WzBdID0gMTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZWNjYmxrd2lkOyBpKyspIHtcbiAgICAgIGdlbnBvbHlbaSArIDFdID0gMTtcbiAgICAgIGZvciAoaiA9IGk7IGogPiAwOyBqLS0pXG4gICAgICAgIGdlbnBvbHlbal0gPSBnZW5wb2x5W2pdXG4gICAgICAgICAgPyBnZW5wb2x5W2ogLSAxXSBeIGdleHBbbW9kbm4oZ2xvZ1tnZW5wb2x5W2pdXSArIGkpXSA6IGdlbnBvbHlbaiAtIDFdO1xuICAgICAgZ2VucG9seVswXSA9IGdleHBbbW9kbm4oZ2xvZ1tnZW5wb2x5WzBdXSArIGkpXTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8PSBlY2NibGt3aWQ7IGkrKylcbiAgICAgIGdlbnBvbHlbaV0gPSBnbG9nW2dlbnBvbHlbaV1dOyAvLyB1c2UgbG9ncyBmb3IgZ2VucG9seVtdIHRvIHNhdmUgY2FsYyBzdGVwXG5cbiAgICAvLyBhcHBlbmQgZWNjIHRvIGRhdGEgYnVmZmVyXG4gICAgayA9IHg7XG4gICAgeSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG5lY2NibGsxOyBpKyspIHtcbiAgICAgIGFwcGVuZHJzKHksIGRhdGFibGt3LCBrLCBlY2NibGt3aWQpO1xuICAgICAgeSArPSBkYXRhYmxrdztcbiAgICAgIGsgKz0gZWNjYmxrd2lkO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgbmVjY2JsazI7IGkrKykge1xuICAgICAgYXBwZW5kcnMoeSwgZGF0YWJsa3cgKyAxLCBrLCBlY2NibGt3aWQpO1xuICAgICAgeSArPSBkYXRhYmxrdyArIDE7XG4gICAgICBrICs9IGVjY2Jsa3dpZDtcbiAgICB9XG4gICAgLy8gaW50ZXJsZWF2ZSBibG9ja3NcbiAgICB5ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YWJsa3c7IGkrKykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxOyBqKyspXG4gICAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbaSArIGogKiBkYXRhYmxrd107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazI7IGorKylcbiAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZlsobmVjY2JsazEgKiBkYXRhYmxrdykgKyBpICsgKGogKiAoZGF0YWJsa3cgKyAxKSldO1xuICAgIH1cbiAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazI7IGorKylcbiAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbKG5lY2NibGsxICogZGF0YWJsa3cpICsgaSArIChqICogKGRhdGFibGt3ICsgMSkpXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZWNjYmxrd2lkOyBpKyspXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazEgKyBuZWNjYmxrMjsgaisrKVxuICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmW3ggKyBpICsgaiAqIGVjY2Jsa3dpZF07XG4gICAgc3RyaW5idWYgPSBlY2NidWY7XG5cbiAgICAvLyBwYWNrIGJpdHMgaW50byBmcmFtZSBhdm9pZGluZyBtYXNrZWQgYXJlYS5cbiAgICB4ID0geSA9IHdpZHRoIC0gMTtcbiAgICBrID0gdiA9IDE7ICAgICAgICAgLy8gdXAsIG1pbnVzXG4gICAgLyogaW50ZWxlYXZlZCBkYXRhIGFuZCBlY2MgY29kZXMgKi9cbiAgICBtID0gKGRhdGFibGt3ICsgZWNjYmxrd2lkKSAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCA4OyBqKysgLCB0IDw8PSAxKSB7XG4gICAgICAgIGlmICgweDgwICYgdClcbiAgICAgICAgICBxcmZyYW1lW3ggKyB3aWR0aCAqIHldID0gMTtcbiAgICAgICAgZG8geyAgICAgICAgLy8gZmluZCBuZXh0IGZpbGwgcG9zaXRpb25cbiAgICAgICAgICBpZiAodilcbiAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHgrKztcbiAgICAgICAgICAgIGlmIChrKSB7XG4gICAgICAgICAgICAgIGlmICh5ICE9IDApXG4gICAgICAgICAgICAgICAgeS0tO1xuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4IC09IDI7XG4gICAgICAgICAgICAgICAgayA9ICFrO1xuICAgICAgICAgICAgICAgIGlmICh4ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICAgICAgICAgIHkgPSA5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh5ICE9IHdpZHRoIC0gMSlcbiAgICAgICAgICAgICAgICB5Kys7XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHggLT0gMjtcbiAgICAgICAgICAgICAgICBrID0gIWs7XG4gICAgICAgICAgICAgICAgaWYgKHggPT0gNikge1xuICAgICAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgICAgICAgeSAtPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2ID0gIXY7XG4gICAgICAgIH0gd2hpbGUgKGlzbWFza2VkKHgsIHkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzYXZlIHByZS1tYXNrIGNvcHkgb2YgZnJhbWVcbiAgICBzdHJpbmJ1ZiA9IHFyZnJhbWUuc2xpY2UoMCk7XG4gICAgdCA9IDA7ICAgICAgICAgICAvLyBiZXN0XG4gICAgeSA9IDMwMDAwOyAgICAgICAgIC8vIGRlbWVyaXRcbiAgICAvLyBmb3IgaW5zdGVhZCBvZiB3aGlsZSBzaW5jZSBpbiBvcmlnaW5hbCBhcmR1aW5vIGNvZGVcbiAgICAvLyBpZiBhbiBlYXJseSBtYXNrIHdhcyBcImdvb2QgZW5vdWdoXCIgaXQgd291bGRuJ3QgdHJ5IGZvciBhIGJldHRlciBvbmVcbiAgICAvLyBzaW5jZSB0aGV5IGdldCBtb3JlIGNvbXBsZXggYW5kIHRha2UgbG9uZ2VyLlxuICAgIGZvciAoayA9IDA7IGsgPCA4OyBrKyspIHtcbiAgICAgIGFwcGx5bWFzayhrKTsgICAgICAvLyByZXR1cm5zIGJsYWNrLXdoaXRlIGltYmFsYW5jZVxuICAgICAgeCA9IGJhZGNoZWNrKCk7XG4gICAgICBpZiAoeCA8IHkpIHsgLy8gY3VycmVudCBtYXNrIGJldHRlciB0aGFuIHByZXZpb3VzIGJlc3Q/XG4gICAgICAgIHkgPSB4O1xuICAgICAgICB0ID0gaztcbiAgICAgIH1cbiAgICAgIGlmICh0ID09IDcpXG4gICAgICAgIGJyZWFrOyAgICAgICAvLyBkb24ndCBpbmNyZW1lbnQgaSB0byBhIHZvaWQgcmVkb2luZyBtYXNrXG4gICAgICBxcmZyYW1lID0gc3RyaW5idWYuc2xpY2UoMCk7IC8vIHJlc2V0IGZvciBuZXh0IHBhc3NcbiAgICB9XG4gICAgaWYgKHQgIT0gaykgICAgICAgICAvLyByZWRvIGJlc3QgbWFzayAtIG5vbmUgZ29vZCBlbm91Z2gsIGxhc3Qgd2Fzbid0IHRcbiAgICAgIGFwcGx5bWFzayh0KTtcblxuICAgIC8vIGFkZCBpbiBmaW5hbCBtYXNrL2VjY2xldmVsIGJ5dGVzXG4gICAgeSA9IGZtdHdvcmRbdCArICgoZWNjbGV2ZWwgLSAxKSA8PCAzKV07XG4gICAgLy8gbG93IGJ5dGVcbiAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrICwgeSA+Pj0gMSlcbiAgICAgIGlmICh5ICYgMSkge1xuICAgICAgICBxcmZyYW1lWyh3aWR0aCAtIDEgLSBrKSArIHdpZHRoICogOF0gPSAxO1xuICAgICAgICBpZiAoayA8IDYpXG4gICAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiBrXSA9IDE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqIChrICsgMSldID0gMTtcbiAgICAgIH1cbiAgICAvLyBoaWdoIGJ5dGVcbiAgICBmb3IgKGsgPSAwOyBrIDwgNzsgaysrICwgeSA+Pj0gMSlcbiAgICAgIGlmICh5ICYgMSkge1xuICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqICh3aWR0aCAtIDcgKyBrKV0gPSAxO1xuICAgICAgICBpZiAoaylcbiAgICAgICAgICBxcmZyYW1lWyg2IC0gaykgKyB3aWR0aCAqIDhdID0gMTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHFyZnJhbWVbNyArIHdpZHRoICogOF0gPSAxO1xuICAgICAgfVxuICAgIHJldHVybiBxcmZyYW1lO1xuICB9XG5cblxuXG5cbiAgdmFyIF9jYW52YXMgPSBudWxsO1xuXG4gIHZhciBhcGkgPSB7XG5cbiAgICBnZXQgZWNjbGV2ZWwoKSB7XG4gICAgICByZXR1cm4gZWNjbGV2ZWw7XG4gICAgfSxcblxuICAgIHNldCBlY2NsZXZlbCh2YWwpIHtcbiAgICAgIGVjY2xldmVsID0gdmFsO1xuICAgIH0sXG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBfc2l6ZTtcbiAgICB9LFxuXG4gICAgc2V0IHNpemUodmFsKSB7XG4gICAgICBfc2l6ZSA9IHZhbFxuICAgIH0sXG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgcmV0dXJuIF9jYW52YXM7XG4gICAgfSxcblxuICAgIHNldCBjYW52YXMoZWwpIHtcbiAgICAgIF9jYW52YXMgPSBlbDtcbiAgICB9LFxuXG4gICAgZ2V0RnJhbWU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgIHJldHVybiBnZW5mcmFtZShzdHJpbmcpO1xuICAgIH0sXG4gICAgLy/ov5nph4znmoR1dGYxNnRvOChzdHIp5piv5a+5VGV4dOS4reeahOWtl+espuS4sui/m+ihjOi9rOegge+8jOiuqeWFtuaUr+aMgeS4reaWh1xuICAgIHV0ZjE2dG84OiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICB2YXIgb3V0LCBpLCBsZW4sIGM7XG5cbiAgICAgIG91dCA9IFwiXCI7XG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKChjID49IDB4MDAwMSkgJiYgKGMgPD0gMHgwMDdGKSkge1xuICAgICAgICAgIG91dCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPiAweDA3RkYpIHtcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweEUwIHwgKChjID4+IDEyKSAmIDB4MEYpKTtcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDgwIHwgKChjID4+IDYpICYgMHgzRikpO1xuICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ODAgfCAoKGMgPj4gMCkgJiAweDNGKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhDMCB8ICgoYyA+PiA2KSAmIDB4MUYpKTtcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDgwIHwgKChjID4+IDApICYgMHgzRikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG4gICAgYmFzZTY0ZW5jb2RlOiBmdW5jdGlvbiAoc3RyKXtcbiAgICAgICAgdmFyIG91dCwgaSwgbGVuO1xuICAgICAgICB2YXIgYzEsIGMyLCBjMztcbiAgICAgICAgbGVuID0gc3RyLmxlbmd0aDtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIG91dCA9IFwiXCI7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgICAgICBjMSA9IHN0ci5jaGFyQ29kZUF0KGkrKykgJiAweGZmO1xuICAgICAgICAgICAgaWYgKGkgPT0gbGVuKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKTtcbiAgICAgICAgICAgICAgICBvdXQgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KChjMSAmIDB4MykgPDwgNCk7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPT1cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgICAgIGlmIChpID09IGxlbikge1xuICAgICAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMik7XG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMxICYgMHgzKSA8PCA0KSB8ICgoYzIgJiAweEYwKSA+PiA0KSk7XG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzIgJiAweEYpIDw8IDIpO1xuICAgICAgICAgICAgICAgIG91dCArPSBcIj1cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMzID0gc3RyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMik7XG4gICAgICAgICAgICBvdXQgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpIHwgKChjMiAmIDB4RjApID4+IDQpKTtcbiAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMiAmIDB4RikgPDwgMikgfCAoKGMzICYgMHhDMCkgPj4gNikpO1xuICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMyAmIDB4M0YpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIGRyYXc6IGZ1bmN0aW9uIChzdHIsIGNhbnZhcywgY2F2VywgY2F2SCwgZWNjKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBlY2NsZXZlbCA9IGVjYyB8fCBlY2NsZXZlbDtcbiAgICAgIGNhbnZhcyA9IGNhbnZhcyB8fCBfY2FudmFzO1xuICAgICAgaWYgKCFjYW52YXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdObyBjYW52YXMgcHJvdmlkZWQgdG8gZHJhdyBRUiBjb2RlIGluIScpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbihjYXZXLCBjYXZIKTtcbiAgICAgIHN0ciA9IHRoYXQudXRmMTZ0bzgoc3RyKTsvL+WinuWKoOS4reaWh+aYvuekulxuXG4gICAgICB2YXIgZnJhbWUgPSB0aGF0LmdldEZyYW1lKHN0ciksXG4gICAgICAgIGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKSxcbiAgICAgICAgcHggPSBNYXRoLnJvdW5kKHNpemUgLyAod2lkdGggKyA4KSk7XG4gICAgICB2YXIgcm91bmRlZFNpemUgPSBweCAqICh3aWR0aCArIDgpLFxuICAgICAgICBvZmZzZXQgPSBNYXRoLmZsb29yKChzaXplIC0gcm91bmRlZFNpemUpIC8gMik7XG4gICAgICBzaXplID0gcm91bmRlZFNpemU7XG4gICAgICBjdHguc2V0RmlsbFN0eWxlKCcjZmZmZmZmJylcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYXZXLCBjYXZXKTtcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAwMDAnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgICBpZiAoZnJhbWVbaiAqIHdpZHRoICsgaV0pIHtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChweCAqICg0ICsgaSkgKyBvZmZzZXQsIHB4ICogKDQgKyBqKSArIG9mZnNldCwgcHgsIHB4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN0eC5kcmF3KCk7XG4gICAgfVxuICB9XG4gIG1vZHVsZS5leHBvcnRzID0geyBhcGkgfVxuXG59KSgpOyJdfQ==