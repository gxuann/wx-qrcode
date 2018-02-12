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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJhZGVsdGEiLCJ2cGF0IiwiZm10d29yZCIsImVjY2Jsb2NrcyIsImdsb2ciLCJnZXhwIiwiYmFzZTY0RW5jb2RlQ2hhcnMiLCJiYXNlNjREZWNvZGVDaGFycyIsIkFycmF5Iiwic3RyaW5idWYiLCJlY2NidWYiLCJxcmZyYW1lIiwiZnJhbWFzayIsInJsZW5zIiwidmVyc2lvbiIsIndpZHRoIiwibmVjY2JsazEiLCJuZWNjYmxrMiIsImRhdGFibGt3IiwiZWNjYmxrd2lkIiwiZWNjbGV2ZWwiLCJzZXRtYXNrIiwieCIsInkiLCJidCIsInB1dGFsaWduIiwiaiIsIm1vZG5uIiwiZ2VucG9seSIsImFwcGVuZHJzIiwiZGF0YSIsImRsZW4iLCJlY2J1ZiIsImVjbGVuIiwiaSIsImZiIiwiaXNtYXNrZWQiLCJhcHBseW1hc2siLCJtIiwicjN4IiwicjN5IiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJiYWRydW5zIiwibGVuZ3RoIiwicnVuc2JhZCIsImJhZGNoZWNrIiwiaCIsImIiLCJiMSIsInRoaXNiYWQiLCJidyIsImJpZyIsImNvdW50IiwiZ2VuZnJhbWUiLCJpbnN0cmluZyIsImsiLCJ0IiwidiIsInNsaWNlIiwiY2hhckNvZGVBdCIsIl9jYW52YXMiLCJhcGkiLCJ2YWwiLCJzaXplIiwiX3NpemUiLCJjYW52YXMiLCJlbCIsImdldEZyYW1lIiwic3RyaW5nIiwidXRmMTZ0bzgiLCJzdHIiLCJvdXQiLCJsZW4iLCJjIiwiY2hhckF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYmFzZTY0ZW5jb2RlIiwiYzEiLCJjMiIsImMzIiwiZHJhdyIsImNhdlciLCJjYXZIIiwiZWNjIiwidGhhdCIsImNvbnNvbGUiLCJ3YXJuIiwiTWF0aCIsIm1pbiIsImZyYW1lIiwiY3R4Iiwid3giLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicHgiLCJyb3VuZCIsInJvdW5kZWRTaXplIiwib2Zmc2V0IiwiZmxvb3IiLCJzZXRGaWxsU3R5bGUi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SCxDQUF1QjVCLE1BQXZCLENBRFI7QUFBQSxVQUVFNkIsS0FBS04sS0FBS08sS0FBTCxDQUFXaEMsUUFBUW5ELFFBQVEsQ0FBaEIsQ0FBWCxDQUZQO0FBR0EsVUFBSW9GLGNBQWNGLE1BQU1sRixRQUFRLENBQWQsQ0FBbEI7QUFBQSxVQUNFcUYsU0FBU1QsS0FBS1UsS0FBTCxDQUFXLENBQUNuQyxPQUFPaUMsV0FBUixJQUF1QixDQUFsQyxDQURYO0FBRUFqQyxhQUFPaUMsV0FBUDtBQUNBTCxVQUFJUSxZQUFKLENBQWlCLFNBQWpCO0FBQ0FSLFVBQUlTLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CbEIsSUFBbkIsRUFBeUJBLElBQXpCO0FBQ0FTLFVBQUlRLFlBQUosQ0FBaUIsU0FBakI7QUFDQSxXQUFLLElBQUlwRSxJQUFJLENBQWIsRUFBZ0JBLElBQUluQixLQUFwQixFQUEyQm1CLEdBQTNCLEVBQWdDO0FBQzlCLGFBQUssSUFBSVIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJWCxLQUFwQixFQUEyQlcsR0FBM0IsRUFBZ0M7QUFDOUIsY0FBSW1FLE1BQU1uRSxJQUFJWCxLQUFKLEdBQVltQixDQUFsQixDQUFKLEVBQTBCO0FBQ3hCNEQsZ0JBQUlTLFFBQUosQ0FBYU4sTUFBTSxJQUFJL0QsQ0FBVixJQUFla0UsTUFBNUIsRUFBb0NILE1BQU0sSUFBSXZFLENBQVYsSUFBZTBFLE1BQW5ELEVBQTJESCxFQUEzRCxFQUErREEsRUFBL0Q7QUFDRDtBQUNGO0FBQ0Y7QUFDREgsVUFBSVYsSUFBSjtBQUNEO0FBOUdPLEdBQVY7QUFnSEFvQixTQUFPQyxPQUFQLEdBQWlCLEVBQUV6QyxRQUFGLEVBQWpCO0FBRUQsQ0E5eUJBLEVBQUQiLCJmaWxlIjoicXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIShmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vIGFsaWdubWVudCBwYXR0ZXJuXHJcbiAgdmFyIGFkZWx0YSA9IFtcclxuICAgIDAsIDExLCAxNSwgMTksIDIzLCAyNywgMzEsXHJcbiAgICAxNiwgMTgsIDIwLCAyMiwgMjQsIDI2LCAyOCwgMjAsIDIyLCAyNCwgMjQsIDI2LCAyOCwgMjgsIDIyLCAyNCwgMjQsXHJcbiAgICAyNiwgMjYsIDI4LCAyOCwgMjQsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjgsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjhcclxuICBdO1xyXG5cclxuICAvLyB2ZXJzaW9uIGJsb2NrXHJcbiAgdmFyIHZwYXQgPSBbXHJcbiAgICAweGM5NCwgMHg1YmMsIDB4YTk5LCAweDRkMywgMHhiZjYsIDB4NzYyLCAweDg0NywgMHg2MGQsXHJcbiAgICAweDkyOCwgMHhiNzgsIDB4NDVkLCAweGExNywgMHg1MzIsIDB4OWE2LCAweDY4MywgMHg4YzksXHJcbiAgICAweDdlYywgMHhlYzQsIDB4MWUxLCAweGZhYiwgMHgwOGUsIDB4YzFhLCAweDMzZiwgMHhkNzUsXHJcbiAgICAweDI1MCwgMHg5ZDUsIDB4NmYwLCAweDhiYSwgMHg3OWYsIDB4YjBiLCAweDQyZSwgMHhhNjQsXHJcbiAgICAweDU0MSwgMHhjNjlcclxuICBdO1xyXG5cclxuICAvLyBmaW5hbCBmb3JtYXQgYml0cyB3aXRoIG1hc2s6IGxldmVsIDw8IDMgfCBtYXNrXHJcbiAgdmFyIGZtdHdvcmQgPSBbXHJcbiAgICAweDc3YzQsIDB4NzJmMywgMHg3ZGFhLCAweDc4OWQsIDB4NjYyZiwgMHg2MzE4LCAweDZjNDEsIDB4Njk3NiwgICAgLy9MXHJcbiAgICAweDU0MTIsIDB4NTEyNSwgMHg1ZTdjLCAweDViNGIsIDB4NDVmOSwgMHg0MGNlLCAweDRmOTcsIDB4NGFhMCwgICAgLy9NXHJcbiAgICAweDM1NWYsIDB4MzA2OCwgMHgzZjMxLCAweDNhMDYsIDB4MjRiNCwgMHgyMTgzLCAweDJlZGEsIDB4MmJlZCwgICAgLy9RXHJcbiAgICAweDE2ODksIDB4MTNiZSwgMHgxY2U3LCAweDE5ZDAsIDB4MDc2MiwgMHgwMjU1LCAweDBkMGMsIDB4MDgzYiAgICAvL0hcclxuICBdO1xyXG5cclxuICAvLyA0IHBlciB2ZXJzaW9uOiBudW1iZXIgb2YgYmxvY2tzIDEsMjsgZGF0YSB3aWR0aDsgZWNjIHdpZHRoXHJcbiAgdmFyIGVjY2Jsb2NrcyA9IFtcclxuICAgIDEsIDAsIDE5LCA3LCAxLCAwLCAxNiwgMTAsIDEsIDAsIDEzLCAxMywgMSwgMCwgOSwgMTcsXHJcbiAgICAxLCAwLCAzNCwgMTAsIDEsIDAsIDI4LCAxNiwgMSwgMCwgMjIsIDIyLCAxLCAwLCAxNiwgMjgsXHJcbiAgICAxLCAwLCA1NSwgMTUsIDEsIDAsIDQ0LCAyNiwgMiwgMCwgMTcsIDE4LCAyLCAwLCAxMywgMjIsXHJcbiAgICAxLCAwLCA4MCwgMjAsIDIsIDAsIDMyLCAxOCwgMiwgMCwgMjQsIDI2LCA0LCAwLCA5LCAxNixcclxuICAgIDEsIDAsIDEwOCwgMjYsIDIsIDAsIDQzLCAyNCwgMiwgMiwgMTUsIDE4LCAyLCAyLCAxMSwgMjIsXHJcbiAgICAyLCAwLCA2OCwgMTgsIDQsIDAsIDI3LCAxNiwgNCwgMCwgMTksIDI0LCA0LCAwLCAxNSwgMjgsXHJcbiAgICAyLCAwLCA3OCwgMjAsIDQsIDAsIDMxLCAxOCwgMiwgNCwgMTQsIDE4LCA0LCAxLCAxMywgMjYsXHJcbiAgICAyLCAwLCA5NywgMjQsIDIsIDIsIDM4LCAyMiwgNCwgMiwgMTgsIDIyLCA0LCAyLCAxNCwgMjYsXHJcbiAgICAyLCAwLCAxMTYsIDMwLCAzLCAyLCAzNiwgMjIsIDQsIDQsIDE2LCAyMCwgNCwgNCwgMTIsIDI0LFxyXG4gICAgMiwgMiwgNjgsIDE4LCA0LCAxLCA0MywgMjYsIDYsIDIsIDE5LCAyNCwgNiwgMiwgMTUsIDI4LFxyXG4gICAgNCwgMCwgODEsIDIwLCAxLCA0LCA1MCwgMzAsIDQsIDQsIDIyLCAyOCwgMywgOCwgMTIsIDI0LFxyXG4gICAgMiwgMiwgOTIsIDI0LCA2LCAyLCAzNiwgMjIsIDQsIDYsIDIwLCAyNiwgNywgNCwgMTQsIDI4LFxyXG4gICAgNCwgMCwgMTA3LCAyNiwgOCwgMSwgMzcsIDIyLCA4LCA0LCAyMCwgMjQsIDEyLCA0LCAxMSwgMjIsXHJcbiAgICAzLCAxLCAxMTUsIDMwLCA0LCA1LCA0MCwgMjQsIDExLCA1LCAxNiwgMjAsIDExLCA1LCAxMiwgMjQsXHJcbiAgICA1LCAxLCA4NywgMjIsIDUsIDUsIDQxLCAyNCwgNSwgNywgMjQsIDMwLCAxMSwgNywgMTIsIDI0LFxyXG4gICAgNSwgMSwgOTgsIDI0LCA3LCAzLCA0NSwgMjgsIDE1LCAyLCAxOSwgMjQsIDMsIDEzLCAxNSwgMzAsXHJcbiAgICAxLCA1LCAxMDcsIDI4LCAxMCwgMSwgNDYsIDI4LCAxLCAxNSwgMjIsIDI4LCAyLCAxNywgMTQsIDI4LFxyXG4gICAgNSwgMSwgMTIwLCAzMCwgOSwgNCwgNDMsIDI2LCAxNywgMSwgMjIsIDI4LCAyLCAxOSwgMTQsIDI4LFxyXG4gICAgMywgNCwgMTEzLCAyOCwgMywgMTEsIDQ0LCAyNiwgMTcsIDQsIDIxLCAyNiwgOSwgMTYsIDEzLCAyNixcclxuICAgIDMsIDUsIDEwNywgMjgsIDMsIDEzLCA0MSwgMjYsIDE1LCA1LCAyNCwgMzAsIDE1LCAxMCwgMTUsIDI4LFxyXG4gICAgNCwgNCwgMTE2LCAyOCwgMTcsIDAsIDQyLCAyNiwgMTcsIDYsIDIyLCAyOCwgMTksIDYsIDE2LCAzMCxcclxuICAgIDIsIDcsIDExMSwgMjgsIDE3LCAwLCA0NiwgMjgsIDcsIDE2LCAyNCwgMzAsIDM0LCAwLCAxMywgMjQsXHJcbiAgICA0LCA1LCAxMjEsIDMwLCA0LCAxNCwgNDcsIDI4LCAxMSwgMTQsIDI0LCAzMCwgMTYsIDE0LCAxNSwgMzAsXHJcbiAgICA2LCA0LCAxMTcsIDMwLCA2LCAxNCwgNDUsIDI4LCAxMSwgMTYsIDI0LCAzMCwgMzAsIDIsIDE2LCAzMCxcclxuICAgIDgsIDQsIDEwNiwgMjYsIDgsIDEzLCA0NywgMjgsIDcsIDIyLCAyNCwgMzAsIDIyLCAxMywgMTUsIDMwLFxyXG4gICAgMTAsIDIsIDExNCwgMjgsIDE5LCA0LCA0NiwgMjgsIDI4LCA2LCAyMiwgMjgsIDMzLCA0LCAxNiwgMzAsXHJcbiAgICA4LCA0LCAxMjIsIDMwLCAyMiwgMywgNDUsIDI4LCA4LCAyNiwgMjMsIDMwLCAxMiwgMjgsIDE1LCAzMCxcclxuICAgIDMsIDEwLCAxMTcsIDMwLCAzLCAyMywgNDUsIDI4LCA0LCAzMSwgMjQsIDMwLCAxMSwgMzEsIDE1LCAzMCxcclxuICAgIDcsIDcsIDExNiwgMzAsIDIxLCA3LCA0NSwgMjgsIDEsIDM3LCAyMywgMzAsIDE5LCAyNiwgMTUsIDMwLFxyXG4gICAgNSwgMTAsIDExNSwgMzAsIDE5LCAxMCwgNDcsIDI4LCAxNSwgMjUsIDI0LCAzMCwgMjMsIDI1LCAxNSwgMzAsXHJcbiAgICAxMywgMywgMTE1LCAzMCwgMiwgMjksIDQ2LCAyOCwgNDIsIDEsIDI0LCAzMCwgMjMsIDI4LCAxNSwgMzAsXHJcbiAgICAxNywgMCwgMTE1LCAzMCwgMTAsIDIzLCA0NiwgMjgsIDEwLCAzNSwgMjQsIDMwLCAxOSwgMzUsIDE1LCAzMCxcclxuICAgIDE3LCAxLCAxMTUsIDMwLCAxNCwgMjEsIDQ2LCAyOCwgMjksIDE5LCAyNCwgMzAsIDExLCA0NiwgMTUsIDMwLFxyXG4gICAgMTMsIDYsIDExNSwgMzAsIDE0LCAyMywgNDYsIDI4LCA0NCwgNywgMjQsIDMwLCA1OSwgMSwgMTYsIDMwLFxyXG4gICAgMTIsIDcsIDEyMSwgMzAsIDEyLCAyNiwgNDcsIDI4LCAzOSwgMTQsIDI0LCAzMCwgMjIsIDQxLCAxNSwgMzAsXHJcbiAgICA2LCAxNCwgMTIxLCAzMCwgNiwgMzQsIDQ3LCAyOCwgNDYsIDEwLCAyNCwgMzAsIDIsIDY0LCAxNSwgMzAsXHJcbiAgICAxNywgNCwgMTIyLCAzMCwgMjksIDE0LCA0NiwgMjgsIDQ5LCAxMCwgMjQsIDMwLCAyNCwgNDYsIDE1LCAzMCxcclxuICAgIDQsIDE4LCAxMjIsIDMwLCAxMywgMzIsIDQ2LCAyOCwgNDgsIDE0LCAyNCwgMzAsIDQyLCAzMiwgMTUsIDMwLFxyXG4gICAgMjAsIDQsIDExNywgMzAsIDQwLCA3LCA0NywgMjgsIDQzLCAyMiwgMjQsIDMwLCAxMCwgNjcsIDE1LCAzMCxcclxuICAgIDE5LCA2LCAxMTgsIDMwLCAxOCwgMzEsIDQ3LCAyOCwgMzQsIDM0LCAyNCwgMzAsIDIwLCA2MSwgMTUsIDMwXHJcbiAgXTtcclxuXHJcbiAgLy8gR2Fsb2lzIGZpZWxkIGxvZyB0YWJsZVxyXG4gIHZhciBnbG9nID0gW1xyXG4gICAgMHhmZiwgMHgwMCwgMHgwMSwgMHgxOSwgMHgwMiwgMHgzMiwgMHgxYSwgMHhjNiwgMHgwMywgMHhkZiwgMHgzMywgMHhlZSwgMHgxYiwgMHg2OCwgMHhjNywgMHg0YixcclxuICAgIDB4MDQsIDB4NjQsIDB4ZTAsIDB4MGUsIDB4MzQsIDB4OGQsIDB4ZWYsIDB4ODEsIDB4MWMsIDB4YzEsIDB4NjksIDB4ZjgsIDB4YzgsIDB4MDgsIDB4NGMsIDB4NzEsXHJcbiAgICAweDA1LCAweDhhLCAweDY1LCAweDJmLCAweGUxLCAweDI0LCAweDBmLCAweDIxLCAweDM1LCAweDkzLCAweDhlLCAweGRhLCAweGYwLCAweDEyLCAweDgyLCAweDQ1LFxyXG4gICAgMHgxZCwgMHhiNSwgMHhjMiwgMHg3ZCwgMHg2YSwgMHgyNywgMHhmOSwgMHhiOSwgMHhjOSwgMHg5YSwgMHgwOSwgMHg3OCwgMHg0ZCwgMHhlNCwgMHg3MiwgMHhhNixcclxuICAgIDB4MDYsIDB4YmYsIDB4OGIsIDB4NjIsIDB4NjYsIDB4ZGQsIDB4MzAsIDB4ZmQsIDB4ZTIsIDB4OTgsIDB4MjUsIDB4YjMsIDB4MTAsIDB4OTEsIDB4MjIsIDB4ODgsXHJcbiAgICAweDM2LCAweGQwLCAweDk0LCAweGNlLCAweDhmLCAweDk2LCAweGRiLCAweGJkLCAweGYxLCAweGQyLCAweDEzLCAweDVjLCAweDgzLCAweDM4LCAweDQ2LCAweDQwLFxyXG4gICAgMHgxZSwgMHg0MiwgMHhiNiwgMHhhMywgMHhjMywgMHg0OCwgMHg3ZSwgMHg2ZSwgMHg2YiwgMHgzYSwgMHgyOCwgMHg1NCwgMHhmYSwgMHg4NSwgMHhiYSwgMHgzZCxcclxuICAgIDB4Y2EsIDB4NWUsIDB4OWIsIDB4OWYsIDB4MGEsIDB4MTUsIDB4NzksIDB4MmIsIDB4NGUsIDB4ZDQsIDB4ZTUsIDB4YWMsIDB4NzMsIDB4ZjMsIDB4YTcsIDB4NTcsXHJcbiAgICAweDA3LCAweDcwLCAweGMwLCAweGY3LCAweDhjLCAweDgwLCAweDYzLCAweDBkLCAweDY3LCAweDRhLCAweGRlLCAweGVkLCAweDMxLCAweGM1LCAweGZlLCAweDE4LFxyXG4gICAgMHhlMywgMHhhNSwgMHg5OSwgMHg3NywgMHgyNiwgMHhiOCwgMHhiNCwgMHg3YywgMHgxMSwgMHg0NCwgMHg5MiwgMHhkOSwgMHgyMywgMHgyMCwgMHg4OSwgMHgyZSxcclxuICAgIDB4MzcsIDB4M2YsIDB4ZDEsIDB4NWIsIDB4OTUsIDB4YmMsIDB4Y2YsIDB4Y2QsIDB4OTAsIDB4ODcsIDB4OTcsIDB4YjIsIDB4ZGMsIDB4ZmMsIDB4YmUsIDB4NjEsXHJcbiAgICAweGYyLCAweDU2LCAweGQzLCAweGFiLCAweDE0LCAweDJhLCAweDVkLCAweDllLCAweDg0LCAweDNjLCAweDM5LCAweDUzLCAweDQ3LCAweDZkLCAweDQxLCAweGEyLFxyXG4gICAgMHgxZiwgMHgyZCwgMHg0MywgMHhkOCwgMHhiNywgMHg3YiwgMHhhNCwgMHg3NiwgMHhjNCwgMHgxNywgMHg0OSwgMHhlYywgMHg3ZiwgMHgwYywgMHg2ZiwgMHhmNixcclxuICAgIDB4NmMsIDB4YTEsIDB4M2IsIDB4NTIsIDB4MjksIDB4OWQsIDB4NTUsIDB4YWEsIDB4ZmIsIDB4NjAsIDB4ODYsIDB4YjEsIDB4YmIsIDB4Y2MsIDB4M2UsIDB4NWEsXHJcbiAgICAweGNiLCAweDU5LCAweDVmLCAweGIwLCAweDljLCAweGE5LCAweGEwLCAweDUxLCAweDBiLCAweGY1LCAweDE2LCAweGViLCAweDdhLCAweDc1LCAweDJjLCAweGQ3LFxyXG4gICAgMHg0ZiwgMHhhZSwgMHhkNSwgMHhlOSwgMHhlNiwgMHhlNywgMHhhZCwgMHhlOCwgMHg3NCwgMHhkNiwgMHhmNCwgMHhlYSwgMHhhOCwgMHg1MCwgMHg1OCwgMHhhZlxyXG4gIF07XHJcblxyXG4gIC8vIEdhbGlvcyBmaWVsZCBleHBvbmVudCB0YWJsZVxyXG4gIHZhciBnZXhwID0gW1xyXG4gICAgMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxZCwgMHgzYSwgMHg3NCwgMHhlOCwgMHhjZCwgMHg4NywgMHgxMywgMHgyNixcclxuICAgIDB4NGMsIDB4OTgsIDB4MmQsIDB4NWEsIDB4YjQsIDB4NzUsIDB4ZWEsIDB4YzksIDB4OGYsIDB4MDMsIDB4MDYsIDB4MGMsIDB4MTgsIDB4MzAsIDB4NjAsIDB4YzAsXHJcbiAgICAweDlkLCAweDI3LCAweDRlLCAweDljLCAweDI1LCAweDRhLCAweDk0LCAweDM1LCAweDZhLCAweGQ0LCAweGI1LCAweDc3LCAweGVlLCAweGMxLCAweDlmLCAweDIzLFxyXG4gICAgMHg0NiwgMHg4YywgMHgwNSwgMHgwYSwgMHgxNCwgMHgyOCwgMHg1MCwgMHhhMCwgMHg1ZCwgMHhiYSwgMHg2OSwgMHhkMiwgMHhiOSwgMHg2ZiwgMHhkZSwgMHhhMSxcclxuICAgIDB4NWYsIDB4YmUsIDB4NjEsIDB4YzIsIDB4OTksIDB4MmYsIDB4NWUsIDB4YmMsIDB4NjUsIDB4Y2EsIDB4ODksIDB4MGYsIDB4MWUsIDB4M2MsIDB4NzgsIDB4ZjAsXHJcbiAgICAweGZkLCAweGU3LCAweGQzLCAweGJiLCAweDZiLCAweGQ2LCAweGIxLCAweDdmLCAweGZlLCAweGUxLCAweGRmLCAweGEzLCAweDViLCAweGI2LCAweDcxLCAweGUyLFxyXG4gICAgMHhkOSwgMHhhZiwgMHg0MywgMHg4NiwgMHgxMSwgMHgyMiwgMHg0NCwgMHg4OCwgMHgwZCwgMHgxYSwgMHgzNCwgMHg2OCwgMHhkMCwgMHhiZCwgMHg2NywgMHhjZSxcclxuICAgIDB4ODEsIDB4MWYsIDB4M2UsIDB4N2MsIDB4ZjgsIDB4ZWQsIDB4YzcsIDB4OTMsIDB4M2IsIDB4NzYsIDB4ZWMsIDB4YzUsIDB4OTcsIDB4MzMsIDB4NjYsIDB4Y2MsXHJcbiAgICAweDg1LCAweDE3LCAweDJlLCAweDVjLCAweGI4LCAweDZkLCAweGRhLCAweGE5LCAweDRmLCAweDllLCAweDIxLCAweDQyLCAweDg0LCAweDE1LCAweDJhLCAweDU0LFxyXG4gICAgMHhhOCwgMHg0ZCwgMHg5YSwgMHgyOSwgMHg1MiwgMHhhNCwgMHg1NSwgMHhhYSwgMHg0OSwgMHg5MiwgMHgzOSwgMHg3MiwgMHhlNCwgMHhkNSwgMHhiNywgMHg3MyxcclxuICAgIDB4ZTYsIDB4ZDEsIDB4YmYsIDB4NjMsIDB4YzYsIDB4OTEsIDB4M2YsIDB4N2UsIDB4ZmMsIDB4ZTUsIDB4ZDcsIDB4YjMsIDB4N2IsIDB4ZjYsIDB4ZjEsIDB4ZmYsXHJcbiAgICAweGUzLCAweGRiLCAweGFiLCAweDRiLCAweDk2LCAweDMxLCAweDYyLCAweGM0LCAweDk1LCAweDM3LCAweDZlLCAweGRjLCAweGE1LCAweDU3LCAweGFlLCAweDQxLFxyXG4gICAgMHg4MiwgMHgxOSwgMHgzMiwgMHg2NCwgMHhjOCwgMHg4ZCwgMHgwNywgMHgwZSwgMHgxYywgMHgzOCwgMHg3MCwgMHhlMCwgMHhkZCwgMHhhNywgMHg1MywgMHhhNixcclxuICAgIDB4NTEsIDB4YTIsIDB4NTksIDB4YjIsIDB4NzksIDB4ZjIsIDB4ZjksIDB4ZWYsIDB4YzMsIDB4OWIsIDB4MmIsIDB4NTYsIDB4YWMsIDB4NDUsIDB4OGEsIDB4MDksXHJcbiAgICAweDEyLCAweDI0LCAweDQ4LCAweDkwLCAweDNkLCAweDdhLCAweGY0LCAweGY1LCAweGY3LCAweGYzLCAweGZiLCAweGViLCAweGNiLCAweDhiLCAweDBiLCAweDE2LFxyXG4gICAgMHgyYywgMHg1OCwgMHhiMCwgMHg3ZCwgMHhmYSwgMHhlOSwgMHhjZiwgMHg4MywgMHgxYiwgMHgzNiwgMHg2YywgMHhkOCwgMHhhZCwgMHg0NywgMHg4ZSwgMHgwMFxyXG4gIF07XHJcbiAgdmFyIGJhc2U2NEVuY29kZUNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcbiAgICB2YXIgYmFzZTY0RGVjb2RlQ2hhcnMgPSBuZXcgQXJyYXkoLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIDYyLCAtMSwgLTEsIC0xLCA2MywgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCA2MCwgNjEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDEsIDQyLCA0MywgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsIDUxLCAtMSwgLTEsIC0xLCAtMSwgLTEpO1xyXG4gIC8vIFdvcmtpbmcgYnVmZmVyczpcclxuICAvLyBkYXRhIGlucHV0IGFuZCBlY2MgYXBwZW5kLCBpbWFnZSB3b3JraW5nIGJ1ZmZlciwgZml4ZWQgcGFydCBvZiBpbWFnZSwgcnVuIGxlbmd0aHMgZm9yIGJhZG5lc3NcclxuICB2YXIgc3RyaW5idWYgPSBbXSwgZWNjYnVmID0gW10sIHFyZnJhbWUgPSBbXSwgZnJhbWFzayA9IFtdLCBybGVucyA9IFtdO1xyXG4gIC8vIENvbnRyb2wgdmFsdWVzIC0gd2lkdGggaXMgYmFzZWQgb24gdmVyc2lvbiwgbGFzdCA0IGFyZSBmcm9tIHRhYmxlLlxyXG4gIHZhciB2ZXJzaW9uLCB3aWR0aCwgbmVjY2JsazEsIG5lY2NibGsyLCBkYXRhYmxrdywgZWNjYmxrd2lkO1xyXG4gIHZhciBlY2NsZXZlbCA9IDI7XHJcbiAgLy8gc2V0IGJpdCB0byBpbmRpY2F0ZSBjZWxsIGluIHFyZnJhbWUgaXMgaW1tdXRhYmxlLiAgc3ltbWV0cmljIGFyb3VuZCBkaWFnb25hbFxyXG4gIGZ1bmN0aW9uIHNldG1hc2soeCwgeSkge1xyXG4gICAgdmFyIGJ0O1xyXG4gICAgaWYgKHggPiB5KSB7XHJcbiAgICAgIGJ0ID0geDtcclxuICAgICAgeCA9IHk7XHJcbiAgICAgIHkgPSBidDtcclxuICAgIH1cclxuICAgIC8vIHkqeSA9IDErMys1Li4uXHJcbiAgICBidCA9IHk7XHJcbiAgICBidCAqPSB5O1xyXG4gICAgYnQgKz0geTtcclxuICAgIGJ0ID4+PSAxO1xyXG4gICAgYnQgKz0geDtcclxuICAgIGZyYW1hc2tbYnRdID0gMTtcclxuICB9XHJcblxyXG4gIC8vIGVudGVyIGFsaWdubWVudCBwYXR0ZXJuIC0gYmxhY2sgdG8gcXJmcmFtZSwgd2hpdGUgdG8gbWFzayAobGF0ZXIgYmxhY2sgZnJhbWUgbWVyZ2VkIHRvIG1hc2spXHJcbiAgZnVuY3Rpb24gcHV0YWxpZ24oeCwgeSkge1xyXG4gICAgdmFyIGo7XHJcblxyXG4gICAgcXJmcmFtZVt4ICsgd2lkdGggKiB5XSA9IDE7XHJcbiAgICBmb3IgKGogPSAtMjsgaiA8IDI7IGorKykge1xyXG4gICAgICBxcmZyYW1lWyh4ICsgaikgKyB3aWR0aCAqICh5IC0gMildID0gMTtcclxuICAgICAgcXJmcmFtZVsoeCAtIDIpICsgd2lkdGggKiAoeSArIGogKyAxKV0gPSAxO1xyXG4gICAgICBxcmZyYW1lWyh4ICsgMikgKyB3aWR0aCAqICh5ICsgaildID0gMTtcclxuICAgICAgcXJmcmFtZVsoeCArIGogKyAxKSArIHdpZHRoICogKHkgKyAyKV0gPSAxO1xyXG4gICAgfVxyXG4gICAgZm9yIChqID0gMDsgaiA8IDI7IGorKykge1xyXG4gICAgICBzZXRtYXNrKHggLSAxLCB5ICsgaik7XHJcbiAgICAgIHNldG1hc2soeCArIDEsIHkgLSBqKTtcclxuICAgICAgc2V0bWFzayh4IC0gaiwgeSAtIDEpO1xyXG4gICAgICBzZXRtYXNrKHggKyBqLCB5ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFJlZWQgU29sb21vbiBlcnJvciBjb3JyZWN0aW9uXHJcbiAgLy8gZXhwb25lbnRpYXRpb24gbW9kIE5cclxuICBmdW5jdGlvbiBtb2Rubih4KSB7XHJcbiAgICB3aGlsZSAoeCA+PSAyNTUpIHtcclxuICAgICAgeCAtPSAyNTU7XHJcbiAgICAgIHggPSAoeCA+PiA4KSArICh4ICYgMjU1KTtcclxuICAgIH1cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcbiAgdmFyIGdlbnBvbHkgPSBbXTtcclxuXHJcbiAgLy8gQ2FsY3VsYXRlIGFuZCBhcHBlbmQgRUNDIGRhdGEgdG8gZGF0YSBibG9jay4gIEJsb2NrIGlzIGluIHN0cmluYnVmLCBpbmRleGVzIHRvIGJ1ZmZlcnMgZ2l2ZW4uXHJcbiAgZnVuY3Rpb24gYXBwZW5kcnMoZGF0YSwgZGxlbiwgZWNidWYsIGVjbGVuKSB7XHJcbiAgICB2YXIgaSwgaiwgZmI7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGVjbGVuOyBpKyspXHJcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgaV0gPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGRsZW47IGkrKykge1xyXG4gICAgICBmYiA9IGdsb2dbc3RyaW5idWZbZGF0YSArIGldIF4gc3RyaW5idWZbZWNidWZdXTtcclxuICAgICAgaWYgKGZiICE9IDI1NSkgICAgIC8qIGZiIHRlcm0gaXMgbm9uLXplcm8gKi9cclxuICAgICAgICBmb3IgKGogPSAxOyBqIDwgZWNsZW47IGorKylcclxuICAgICAgICAgIHN0cmluYnVmW2VjYnVmICsgaiAtIDFdID0gc3RyaW5idWZbZWNidWYgKyBqXSBeIGdleHBbbW9kbm4oZmIgKyBnZW5wb2x5W2VjbGVuIC0gal0pXTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIGZvciAoaiA9IGVjYnVmOyBqIDwgZWNidWYgKyBlY2xlbjsgaisrKVxyXG4gICAgICAgICAgc3RyaW5idWZbal0gPSBzdHJpbmJ1ZltqICsgMV07XHJcbiAgICAgIHN0cmluYnVmW2VjYnVmICsgZWNsZW4gLSAxXSA9IGZiID09IDI1NSA/IDAgOiBnZXhwW21vZG5uKGZiICsgZ2VucG9seVswXSldO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBGcmFtZSBkYXRhIGluc2VydCBmb2xsb3dpbmcgdGhlIHBhdGggcnVsZXNcclxuXHJcbiAgLy8gY2hlY2sgbWFzayAtIHNpbmNlIHN5bW1ldHJpY2FsIHVzZSBoYWxmLlxyXG4gIGZ1bmN0aW9uIGlzbWFza2VkKHgsIHkpIHtcclxuICAgIHZhciBidDtcclxuICAgIGlmICh4ID4geSkge1xyXG4gICAgICBidCA9IHg7XHJcbiAgICAgIHggPSB5O1xyXG4gICAgICB5ID0gYnQ7XHJcbiAgICB9XHJcbiAgICBidCA9IHk7XHJcbiAgICBidCArPSB5ICogeTtcclxuICAgIGJ0ID4+PSAxO1xyXG4gICAgYnQgKz0geDtcclxuICAgIHJldHVybiBmcmFtYXNrW2J0XTtcclxuICB9XHJcblxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gIEFwcGx5IHRoZSBzZWxlY3RlZCBtYXNrIG91dCBvZiB0aGUgOC5cclxuICBmdW5jdGlvbiBhcHBseW1hc2sobSkge1xyXG4gICAgdmFyIHgsIHksIHIzeCwgcjN5O1xyXG5cclxuICAgIHN3aXRjaCAobSkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKylcclxuICAgICAgICAgICAgaWYgKCEoKHggKyB5KSAmIDEpICYmICFpc21hc2tlZCh4LCB5KSlcclxuICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcclxuICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxyXG4gICAgICAgICAgICBpZiAoISh5ICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxyXG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xyXG4gICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgcjN4ID0gMDtcclxuICAgICAgICAgICAgaWYgKCFyM3ggJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrICwgcjN5KyspIHtcclxuICAgICAgICAgIGlmIChyM3kgPT0gMylcclxuICAgICAgICAgICAgcjN5ID0gMDtcclxuICAgICAgICAgIGZvciAocjN4ID0gcjN5LCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xyXG4gICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgcjN4ID0gMDtcclxuICAgICAgICAgICAgaWYgKCFyM3ggJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKylcclxuICAgICAgICAgIGZvciAocjN4ID0gMCwgcjN5ID0gKCh5ID4+IDEpICYgMSksIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMykge1xyXG4gICAgICAgICAgICAgIHIzeCA9IDA7XHJcbiAgICAgICAgICAgICAgcjN5ID0gIXIzeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXIzeSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgZm9yIChyM3kgPSAwLCB5ID0gMDsgeSA8IHdpZHRoOyB5KysgLCByM3krKykge1xyXG4gICAgICAgICAgaWYgKHIzeSA9PSAzKVxyXG4gICAgICAgICAgICByM3kgPSAwO1xyXG4gICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgLCByM3grKykge1xyXG4gICAgICAgICAgICBpZiAocjN4ID09IDMpXHJcbiAgICAgICAgICAgICAgcjN4ID0gMDtcclxuICAgICAgICAgICAgaWYgKCEoKHggJiB5ICYgMSkgKyAhKCFyM3ggfCAhcjN5KSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNjpcclxuICAgICAgICBmb3IgKHIzeSA9IDAsIHkgPSAwOyB5IDwgd2lkdGg7IHkrKyAsIHIzeSsrKSB7XHJcbiAgICAgICAgICBpZiAocjN5ID09IDMpXHJcbiAgICAgICAgICAgIHIzeSA9IDA7XHJcbiAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcclxuICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICBpZiAoISgoKHggJiB5ICYgMSkgKyAocjN4ICYmIChyM3ggPT0gcjN5KSkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxyXG4gICAgICAgICAgICAgIHFyZnJhbWVbeCArIHkgKiB3aWR0aF0gXj0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICBmb3IgKHIzeSA9IDAsIHkgPSAwOyB5IDwgd2lkdGg7IHkrKyAsIHIzeSsrKSB7XHJcbiAgICAgICAgICBpZiAocjN5ID09IDMpXHJcbiAgICAgICAgICAgIHIzeSA9IDA7XHJcbiAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKyAsIHIzeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyM3ggPT0gMylcclxuICAgICAgICAgICAgICByM3ggPSAwO1xyXG4gICAgICAgICAgICBpZiAoISgoKHIzeCAmJiAocjN4ID09IHIzeSkpICsgKCh4ICsgeSkgJiAxKSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXHJcbiAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIEJhZG5lc3MgY29lZmZpY2llbnRzLlxyXG4gIHZhciBOMSA9IDMsIE4yID0gMywgTjMgPSA0MCwgTjQgPSAxMDtcclxuXHJcbiAgLy8gVXNpbmcgdGhlIHRhYmxlIG9mIHRoZSBsZW5ndGggb2YgZWFjaCBydW4sIGNhbGN1bGF0ZSB0aGUgYW1vdW50IG9mIGJhZCBpbWFnZVxyXG4gIC8vIC0gbG9uZyBydW5zIG9yIHRob3NlIHRoYXQgbG9vayBsaWtlIGZpbmRlcnM7IGNhbGxlZCB0d2ljZSwgb25jZSBlYWNoIGZvciBYIGFuZCBZXHJcbiAgZnVuY3Rpb24gYmFkcnVucyhsZW5ndGgpIHtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIHJ1bnNiYWQgPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8PSBsZW5ndGg7IGkrKylcclxuICAgICAgaWYgKHJsZW5zW2ldID49IDUpXHJcbiAgICAgICAgcnVuc2JhZCArPSBOMSArIHJsZW5zW2ldIC0gNTtcclxuICAgIC8vIEJ3QkJCd0IgYXMgaW4gZmluZGVyXHJcbiAgICBmb3IgKGkgPSAzOyBpIDwgbGVuZ3RoIC0gMTsgaSArPSAyKVxyXG4gICAgICBpZiAocmxlbnNbaSAtIDJdID09IHJsZW5zW2kgKyAyXVxyXG4gICAgICAgICYmIHJsZW5zW2kgKyAyXSA9PSBybGVuc1tpIC0gMV1cclxuICAgICAgICAmJiBybGVuc1tpIC0gMV0gPT0gcmxlbnNbaSArIDFdXHJcbiAgICAgICAgJiYgcmxlbnNbaSAtIDFdICogMyA9PSBybGVuc1tpXVxyXG4gICAgICAgIC8vIHdoaXRlIGFyb3VuZCB0aGUgYmxhY2sgcGF0dGVybj8gTm90IHBhcnQgb2Ygc3BlY1xyXG4gICAgICAgICYmIChybGVuc1tpIC0gM10gPT0gMCAvLyBiZWdpbm5pbmdcclxuICAgICAgICAgIHx8IGkgKyAzID4gbGVuZ3RoICAvLyBlbmRcclxuICAgICAgICAgIHx8IHJsZW5zW2kgLSAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0IHx8IHJsZW5zW2kgKyAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0KVxyXG4gICAgICApXHJcbiAgICAgICAgcnVuc2JhZCArPSBOMztcclxuICAgIHJldHVybiBydW5zYmFkO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FsY3VsYXRlIGhvdyBiYWQgdGhlIG1hc2tlZCBpbWFnZSBpcyAtIGJsb2NrcywgaW1iYWxhbmNlLCBydW5zLCBvciBmaW5kZXJzLlxyXG4gIGZ1bmN0aW9uIGJhZGNoZWNrKCkge1xyXG4gICAgdmFyIHgsIHksIGgsIGIsIGIxO1xyXG4gICAgdmFyIHRoaXNiYWQgPSAwO1xyXG4gICAgdmFyIGJ3ID0gMDtcclxuXHJcbiAgICAvLyBibG9ja3Mgb2Ygc2FtZSBjb2xvci5cclxuICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aCAtIDE7IHkrKylcclxuICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTsgeCsrKVxyXG4gICAgICAgIGlmICgocXJmcmFtZVt4ICsgd2lkdGggKiB5XSAmJiBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqIHldXHJcbiAgICAgICAgICAmJiBxcmZyYW1lW3ggKyB3aWR0aCAqICh5ICsgMSldICYmIHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogKHkgKyAxKV0pIC8vIGFsbCBibGFja1xyXG4gICAgICAgICAgfHwgIShxcmZyYW1lW3ggKyB3aWR0aCAqIHldIHx8IHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogeV1cclxuICAgICAgICAgICAgfHwgcXJmcmFtZVt4ICsgd2lkdGggKiAoeSArIDEpXSB8fCBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqICh5ICsgMSldKSkgLy8gYWxsIHdoaXRlXHJcbiAgICAgICAgICB0aGlzYmFkICs9IE4yO1xyXG5cclxuICAgIC8vIFggcnVuc1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcclxuICAgICAgcmxlbnNbMF0gPSAwO1xyXG4gICAgICBmb3IgKGggPSBiID0geCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgaWYgKChiMSA9IHFyZnJhbWVbeCArIHdpZHRoICogeV0pID09IGIpXHJcbiAgICAgICAgICBybGVuc1toXSsrO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHJsZW5zWysraF0gPSAxO1xyXG4gICAgICAgIGIgPSBiMTtcclxuICAgICAgICBidyArPSBiID8gMSA6IC0xO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXNiYWQgKz0gYmFkcnVucyhoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBibGFjay93aGl0ZSBpbWJhbGFuY2VcclxuICAgIGlmIChidyA8IDApXHJcbiAgICAgIGJ3ID0gLWJ3O1xyXG5cclxuICAgIHZhciBiaWcgPSBidztcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICBiaWcgKz0gYmlnIDw8IDI7XHJcbiAgICBiaWcgPDw9IDE7XHJcbiAgICB3aGlsZSAoYmlnID4gd2lkdGggKiB3aWR0aClcclxuICAgICAgYmlnIC09IHdpZHRoICogd2lkdGgsIGNvdW50Kys7XHJcbiAgICB0aGlzYmFkICs9IGNvdW50ICogTjQ7XHJcblxyXG4gICAgLy8gWSBydW5zXHJcbiAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICBybGVuc1swXSA9IDA7XHJcbiAgICAgIGZvciAoaCA9IGIgPSB5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcclxuICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcclxuICAgICAgICAgIHJsZW5zW2hdKys7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgcmxlbnNbKytoXSA9IDE7XHJcbiAgICAgICAgYiA9IGIxO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXNiYWQgKz0gYmFkcnVucyhoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzYmFkO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2VuZnJhbWUoaW5zdHJpbmcpIHtcclxuICAgIHZhciB4LCB5LCBrLCB0LCB2LCBpLCBqLCBtO1xyXG5cclxuICAgIC8vIGZpbmQgdGhlIHNtYWxsZXN0IHZlcnNpb24gdGhhdCBmaXRzIHRoZSBzdHJpbmdcclxuICAgIHQgPSBpbnN0cmluZy5sZW5ndGg7XHJcbiAgICB2ZXJzaW9uID0gMDtcclxuICAgIGRvIHtcclxuICAgICAgdmVyc2lvbisrO1xyXG4gICAgICBrID0gKGVjY2xldmVsIC0gMSkgKiA0ICsgKHZlcnNpb24gLSAxKSAqIDE2O1xyXG4gICAgICBuZWNjYmxrMSA9IGVjY2Jsb2Nrc1trKytdO1xyXG4gICAgICBuZWNjYmxrMiA9IGVjY2Jsb2Nrc1trKytdO1xyXG4gICAgICBkYXRhYmxrdyA9IGVjY2Jsb2Nrc1trKytdO1xyXG4gICAgICBlY2NibGt3aWQgPSBlY2NibG9ja3Nba107XHJcbiAgICAgIGsgPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyIC0gMyArICh2ZXJzaW9uIDw9IDkpO1xyXG4gICAgICBpZiAodCA8PSBrKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfSB3aGlsZSAodmVyc2lvbiA8IDQwKTtcclxuXHJcbiAgICAvLyBGSVhNRSAtIGluc3VyZSB0aGF0IGl0IGZpdHMgaW5zdGVkIG9mIGJlaW5nIHRydW5jYXRlZFxyXG4gICAgd2lkdGggPSAxNyArIDQgKiB2ZXJzaW9uO1xyXG5cclxuICAgIC8vIGFsbG9jYXRlLCBjbGVhciBhbmQgc2V0dXAgZGF0YSBzdHJ1Y3R1cmVzXHJcbiAgICB2ID0gZGF0YWJsa3cgKyAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XHJcbiAgICBmb3IgKHQgPSAwOyB0IDwgdjsgdCsrKVxyXG4gICAgICBlY2NidWZbdF0gPSAwO1xyXG4gICAgc3RyaW5idWYgPSBpbnN0cmluZy5zbGljZSgwKTtcclxuXHJcbiAgICBmb3IgKHQgPSAwOyB0IDwgd2lkdGggKiB3aWR0aDsgdCsrKVxyXG4gICAgICBxcmZyYW1lW3RdID0gMDtcclxuXHJcbiAgICBmb3IgKHQgPSAwOyB0IDwgKHdpZHRoICogKHdpZHRoICsgMSkgKyAxKSAvIDI7IHQrKylcclxuICAgICAgZnJhbWFza1t0XSA9IDA7XHJcblxyXG4gICAgLy8gaW5zZXJ0IGZpbmRlcnMgLSBibGFjayB0byBmcmFtZSwgd2hpdGUgdG8gbWFza1xyXG4gICAgZm9yICh0ID0gMDsgdCA8IDM7IHQrKykge1xyXG4gICAgICBrID0gMDtcclxuICAgICAgeSA9IDA7XHJcbiAgICAgIGlmICh0ID09IDEpXHJcbiAgICAgICAgayA9ICh3aWR0aCAtIDcpO1xyXG4gICAgICBpZiAodCA9PSAyKVxyXG4gICAgICAgIHkgPSAod2lkdGggLSA3KTtcclxuICAgICAgcXJmcmFtZVsoeSArIDMpICsgd2lkdGggKiAoayArIDMpXSA9IDE7XHJcbiAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspIHtcclxuICAgICAgICBxcmZyYW1lWyh5ICsgeCkgKyB3aWR0aCAqIGtdID0gMTtcclxuICAgICAgICBxcmZyYW1lW3kgKyB3aWR0aCAqIChrICsgeCArIDEpXSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIDYpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIHggKyAxKSArIHdpZHRoICogKGsgKyA2KV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAoeCA9IDE7IHggPCA1OyB4KyspIHtcclxuICAgICAgICBzZXRtYXNrKHkgKyB4LCBrICsgMSk7XHJcbiAgICAgICAgc2V0bWFzayh5ICsgMSwgayArIHggKyAxKTtcclxuICAgICAgICBzZXRtYXNrKHkgKyA1LCBrICsgeCk7XHJcbiAgICAgICAgc2V0bWFzayh5ICsgeCArIDEsIGsgKyA1KTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHggPSAyOyB4IDwgNDsgeCsrKSB7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIHgpICsgd2lkdGggKiAoayArIDIpXSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVsoeSArIDIpICsgd2lkdGggKiAoayArIHggKyAxKV0gPSAxO1xyXG4gICAgICAgIHFyZnJhbWVbKHkgKyA0KSArIHdpZHRoICogKGsgKyB4KV0gPSAxO1xyXG4gICAgICAgIHFyZnJhbWVbKHkgKyB4ICsgMSkgKyB3aWR0aCAqIChrICsgNCldID0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsaWdubWVudCBibG9ja3NcclxuICAgIGlmICh2ZXJzaW9uID4gMSkge1xyXG4gICAgICB0ID0gYWRlbHRhW3ZlcnNpb25dO1xyXG4gICAgICB5ID0gd2lkdGggLSA3O1xyXG4gICAgICBmb3IgKDsgOykge1xyXG4gICAgICAgIHggPSB3aWR0aCAtIDc7XHJcbiAgICAgICAgd2hpbGUgKHggPiB0IC0gMykge1xyXG4gICAgICAgICAgcHV0YWxpZ24oeCwgeSk7XHJcbiAgICAgICAgICBpZiAoeCA8IHQpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgeCAtPSB0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeSA8PSB0ICsgOSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIHkgLT0gdDtcclxuICAgICAgICBwdXRhbGlnbig2LCB5KTtcclxuICAgICAgICBwdXRhbGlnbih5LCA2KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNpbmdsZSBibGFja1xyXG4gICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA4KV0gPSAxO1xyXG5cclxuICAgIC8vIHRpbWluZyBnYXAgLSBtYXNrIG9ubHlcclxuICAgIGZvciAoeSA9IDA7IHkgPCA3OyB5KyspIHtcclxuICAgICAgc2V0bWFzayg3LCB5KTtcclxuICAgICAgc2V0bWFzayh3aWR0aCAtIDgsIHkpO1xyXG4gICAgICBzZXRtYXNrKDcsIHkgKyB3aWR0aCAtIDcpO1xyXG4gICAgfVxyXG4gICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xyXG4gICAgICBzZXRtYXNrKHgsIDcpO1xyXG4gICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDcpO1xyXG4gICAgICBzZXRtYXNrKHgsIHdpZHRoIC0gOCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVzZXJ2ZSBtYXNrLWZvcm1hdCBhcmVhXHJcbiAgICBmb3IgKHggPSAwOyB4IDwgOTsgeCsrKVxyXG4gICAgICBzZXRtYXNrKHgsIDgpO1xyXG4gICAgZm9yICh4ID0gMDsgeCA8IDg7IHgrKykge1xyXG4gICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDgpO1xyXG4gICAgICBzZXRtYXNrKDgsIHgpO1xyXG4gICAgfVxyXG4gICAgZm9yICh5ID0gMDsgeSA8IDc7IHkrKylcclxuICAgICAgc2V0bWFzayg4LCB5ICsgd2lkdGggLSA3KTtcclxuXHJcbiAgICAvLyB0aW1pbmcgcm93L2NvbFxyXG4gICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTQ7IHgrKylcclxuICAgICAgaWYgKHggJiAxKSB7XHJcbiAgICAgICAgc2V0bWFzayg4ICsgeCwgNik7XHJcbiAgICAgICAgc2V0bWFzayg2LCA4ICsgeCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcXJmcmFtZVsoOCArIHgpICsgd2lkdGggKiA2XSA9IDE7XHJcbiAgICAgICAgcXJmcmFtZVs2ICsgd2lkdGggKiAoOCArIHgpXSA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAvLyB2ZXJzaW9uIGJsb2NrXHJcbiAgICBpZiAodmVyc2lvbiA+IDYpIHtcclxuICAgICAgdCA9IHZwYXRbdmVyc2lvbiAtIDddO1xyXG4gICAgICBrID0gMTc7XHJcbiAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspXHJcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IDM7IHkrKyAsIGstLSlcclxuICAgICAgICAgIGlmICgxICYgKGsgPiAxMSA/IHZlcnNpb24gPj4gKGsgLSAxMikgOiB0ID4+IGspKSB7XHJcbiAgICAgICAgICAgIHFyZnJhbWVbKDUgLSB4KSArIHdpZHRoICogKDIgLSB5ICsgd2lkdGggLSAxMSldID0gMTtcclxuICAgICAgICAgICAgcXJmcmFtZVsoMiAtIHkgKyB3aWR0aCAtIDExKSArIHdpZHRoICogKDUgLSB4KV0gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldG1hc2soNSAtIHgsIDIgLSB5ICsgd2lkdGggLSAxMSk7XHJcbiAgICAgICAgICAgIHNldG1hc2soMiAtIHkgKyB3aWR0aCAtIDExLCA1IC0geCk7XHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3luYyBtYXNrIGJpdHMgLSBvbmx5IHNldCBhYm92ZSBmb3Igd2hpdGUgc3BhY2VzLCBzbyBhZGQgaW4gYmxhY2sgYml0c1xyXG4gICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXHJcbiAgICAgIGZvciAoeCA9IDA7IHggPD0geTsgeCsrKVxyXG4gICAgICAgIGlmIChxcmZyYW1lW3ggKyB3aWR0aCAqIHldKVxyXG4gICAgICAgICAgc2V0bWFzayh4LCB5KTtcclxuXHJcbiAgICAvLyBjb252ZXJ0IHN0cmluZyB0byBiaXRzdHJlYW1cclxuICAgIC8vIDggYml0IGRhdGEgdG8gUVItY29kZWQgOCBiaXQgZGF0YSAobnVtZXJpYyBvciBhbHBoYW51bSwgb3Iga2Fuamkgbm90IHN1cHBvcnRlZClcclxuICAgIHYgPSBzdHJpbmJ1Zi5sZW5ndGg7XHJcblxyXG4gICAgLy8gc3RyaW5nIHRvIGFycmF5XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdjsgaSsrKVxyXG4gICAgICBlY2NidWZbaV0gPSBzdHJpbmJ1Zi5jaGFyQ29kZUF0KGkpO1xyXG4gICAgc3RyaW5idWYgPSBlY2NidWYuc2xpY2UoMCk7XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIG1heCBzdHJpbmcgbGVuZ3RoXHJcbiAgICB4ID0gZGF0YWJsa3cgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcclxuICAgIGlmICh2ID49IHggLSAyKSB7XHJcbiAgICAgIHYgPSB4IC0gMjtcclxuICAgICAgaWYgKHZlcnNpb24gPiA5KVxyXG4gICAgICAgIHYtLTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlmdCBhbmQgcmVwYWNrIHRvIGluc2VydCBsZW5ndGggcHJlZml4XHJcbiAgICBpID0gdjtcclxuICAgIGlmICh2ZXJzaW9uID4gOSkge1xyXG4gICAgICBzdHJpbmJ1ZltpICsgMl0gPSAwO1xyXG4gICAgICBzdHJpbmJ1ZltpICsgM10gPSAwO1xyXG4gICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdCA9IHN0cmluYnVmW2ldO1xyXG4gICAgICAgIHN0cmluYnVmW2kgKyAzXSB8PSAyNTUgJiAodCA8PCA0KTtcclxuICAgICAgICBzdHJpbmJ1ZltpICsgMl0gPSB0ID4+IDQ7XHJcbiAgICAgIH1cclxuICAgICAgc3RyaW5idWZbMl0gfD0gMjU1ICYgKHYgPDwgNCk7XHJcbiAgICAgIHN0cmluYnVmWzFdID0gdiA+PiA0O1xyXG4gICAgICBzdHJpbmJ1ZlswXSA9IDB4NDAgfCAodiA+PiAxMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgc3RyaW5idWZbaSArIDFdID0gMDtcclxuICAgICAgc3RyaW5idWZbaSArIDJdID0gMDtcclxuICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcclxuICAgICAgICBzdHJpbmJ1ZltpICsgMl0gfD0gMjU1ICYgKHQgPDwgNCk7XHJcbiAgICAgICAgc3RyaW5idWZbaSArIDFdID0gdCA+PiA0O1xyXG4gICAgICB9XHJcbiAgICAgIHN0cmluYnVmWzFdIHw9IDI1NSAmICh2IDw8IDQpO1xyXG4gICAgICBzdHJpbmJ1ZlswXSA9IDB4NDAgfCAodiA+PiA0KTtcclxuICAgIH1cclxuICAgIC8vIGZpbGwgdG8gZW5kIHdpdGggcGFkIHBhdHRlcm5cclxuICAgIGkgPSB2ICsgMyAtICh2ZXJzaW9uIDwgMTApO1xyXG4gICAgd2hpbGUgKGkgPCB4KSB7XHJcbiAgICAgIHN0cmluYnVmW2krK10gPSAweGVjO1xyXG4gICAgICAvLyBidWZmZXIgaGFzIHJvb20gICAgaWYgKGkgPT0geCkgICAgICBicmVhaztcclxuICAgICAgc3RyaW5idWZbaSsrXSA9IDB4MTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIGFuZCBhcHBlbmQgRUNDXHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIGdlbmVyYXRvciBwb2x5bm9taWFsXHJcbiAgICBnZW5wb2x5WzBdID0gMTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBlY2NibGt3aWQ7IGkrKykge1xyXG4gICAgICBnZW5wb2x5W2kgKyAxXSA9IDE7XHJcbiAgICAgIGZvciAoaiA9IGk7IGogPiAwOyBqLS0pXHJcbiAgICAgICAgZ2VucG9seVtqXSA9IGdlbnBvbHlbal1cclxuICAgICAgICAgID8gZ2VucG9seVtqIC0gMV0gXiBnZXhwW21vZG5uKGdsb2dbZ2VucG9seVtqXV0gKyBpKV0gOiBnZW5wb2x5W2ogLSAxXTtcclxuICAgICAgZ2VucG9seVswXSA9IGdleHBbbW9kbm4oZ2xvZ1tnZW5wb2x5WzBdXSArIGkpXTtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPD0gZWNjYmxrd2lkOyBpKyspXHJcbiAgICAgIGdlbnBvbHlbaV0gPSBnbG9nW2dlbnBvbHlbaV1dOyAvLyB1c2UgbG9ncyBmb3IgZ2VucG9seVtdIHRvIHNhdmUgY2FsYyBzdGVwXHJcblxyXG4gICAgLy8gYXBwZW5kIGVjYyB0byBkYXRhIGJ1ZmZlclxyXG4gICAgayA9IHg7XHJcbiAgICB5ID0gMDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBuZWNjYmxrMTsgaSsrKSB7XHJcbiAgICAgIGFwcGVuZHJzKHksIGRhdGFibGt3LCBrLCBlY2NibGt3aWQpO1xyXG4gICAgICB5ICs9IGRhdGFibGt3O1xyXG4gICAgICBrICs9IGVjY2Jsa3dpZDtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBuZWNjYmxrMjsgaSsrKSB7XHJcbiAgICAgIGFwcGVuZHJzKHksIGRhdGFibGt3ICsgMSwgaywgZWNjYmxrd2lkKTtcclxuICAgICAgeSArPSBkYXRhYmxrdyArIDE7XHJcbiAgICAgIGsgKz0gZWNjYmxrd2lkO1xyXG4gICAgfVxyXG4gICAgLy8gaW50ZXJsZWF2ZSBibG9ja3NcclxuICAgIHkgPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGRhdGFibGt3OyBpKyspIHtcclxuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxOyBqKyspXHJcbiAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZltpICsgaiAqIGRhdGFibGt3XTtcclxuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsyOyBqKyspXHJcbiAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZlsobmVjY2JsazEgKiBkYXRhYmxrdykgKyBpICsgKGogKiAoZGF0YWJsa3cgKyAxKSldO1xyXG4gICAgfVxyXG4gICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsyOyBqKyspXHJcbiAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbKG5lY2NibGsxICogZGF0YWJsa3cpICsgaSArIChqICogKGRhdGFibGt3ICsgMSkpXTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBlY2NibGt3aWQ7IGkrKylcclxuICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxICsgbmVjY2JsazI7IGorKylcclxuICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmW3ggKyBpICsgaiAqIGVjY2Jsa3dpZF07XHJcbiAgICBzdHJpbmJ1ZiA9IGVjY2J1ZjtcclxuXHJcbiAgICAvLyBwYWNrIGJpdHMgaW50byBmcmFtZSBhdm9pZGluZyBtYXNrZWQgYXJlYS5cclxuICAgIHggPSB5ID0gd2lkdGggLSAxO1xyXG4gICAgayA9IHYgPSAxOyAgICAgICAgIC8vIHVwLCBtaW51c1xyXG4gICAgLyogaW50ZWxlYXZlZCBkYXRhIGFuZCBlY2MgY29kZXMgKi9cclxuICAgIG0gPSAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSsrKSB7XHJcbiAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcclxuICAgICAgZm9yIChqID0gMDsgaiA8IDg7IGorKyAsIHQgPDw9IDEpIHtcclxuICAgICAgICBpZiAoMHg4MCAmIHQpXHJcbiAgICAgICAgICBxcmZyYW1lW3ggKyB3aWR0aCAqIHldID0gMTtcclxuICAgICAgICBkbyB7ICAgICAgICAvLyBmaW5kIG5leHQgZmlsbCBwb3NpdGlvblxyXG4gICAgICAgICAgaWYgKHYpXHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB4Kys7XHJcbiAgICAgICAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHkgIT0gMClcclxuICAgICAgICAgICAgICAgIHktLTtcclxuICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHggLT0gMjtcclxuICAgICAgICAgICAgICAgIGsgPSAhaztcclxuICAgICAgICAgICAgICAgIGlmICh4ID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgICAgICAgICAgICB5ID0gOTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHkgIT0gd2lkdGggLSAxKVxyXG4gICAgICAgICAgICAgICAgeSsrO1xyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeCAtPSAyO1xyXG4gICAgICAgICAgICAgICAgayA9ICFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICB4LS07XHJcbiAgICAgICAgICAgICAgICAgIHkgLT0gODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHYgPSAhdjtcclxuICAgICAgICB9IHdoaWxlIChpc21hc2tlZCh4LCB5KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzYXZlIHByZS1tYXNrIGNvcHkgb2YgZnJhbWVcclxuICAgIHN0cmluYnVmID0gcXJmcmFtZS5zbGljZSgwKTtcclxuICAgIHQgPSAwOyAgICAgICAgICAgLy8gYmVzdFxyXG4gICAgeSA9IDMwMDAwOyAgICAgICAgIC8vIGRlbWVyaXRcclxuICAgIC8vIGZvciBpbnN0ZWFkIG9mIHdoaWxlIHNpbmNlIGluIG9yaWdpbmFsIGFyZHVpbm8gY29kZVxyXG4gICAgLy8gaWYgYW4gZWFybHkgbWFzayB3YXMgXCJnb29kIGVub3VnaFwiIGl0IHdvdWxkbid0IHRyeSBmb3IgYSBiZXR0ZXIgb25lXHJcbiAgICAvLyBzaW5jZSB0aGV5IGdldCBtb3JlIGNvbXBsZXggYW5kIHRha2UgbG9uZ2VyLlxyXG4gICAgZm9yIChrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICBhcHBseW1hc2soayk7ICAgICAgLy8gcmV0dXJucyBibGFjay13aGl0ZSBpbWJhbGFuY2VcclxuICAgICAgeCA9IGJhZGNoZWNrKCk7XHJcbiAgICAgIGlmICh4IDwgeSkgeyAvLyBjdXJyZW50IG1hc2sgYmV0dGVyIHRoYW4gcHJldmlvdXMgYmVzdD9cclxuICAgICAgICB5ID0geDtcclxuICAgICAgICB0ID0gaztcclxuICAgICAgfVxyXG4gICAgICBpZiAodCA9PSA3KVxyXG4gICAgICAgIGJyZWFrOyAgICAgICAvLyBkb24ndCBpbmNyZW1lbnQgaSB0byBhIHZvaWQgcmVkb2luZyBtYXNrXHJcbiAgICAgIHFyZnJhbWUgPSBzdHJpbmJ1Zi5zbGljZSgwKTsgLy8gcmVzZXQgZm9yIG5leHQgcGFzc1xyXG4gICAgfVxyXG4gICAgaWYgKHQgIT0gaykgICAgICAgICAvLyByZWRvIGJlc3QgbWFzayAtIG5vbmUgZ29vZCBlbm91Z2gsIGxhc3Qgd2Fzbid0IHRcclxuICAgICAgYXBwbHltYXNrKHQpO1xyXG5cclxuICAgIC8vIGFkZCBpbiBmaW5hbCBtYXNrL2VjY2xldmVsIGJ5dGVzXHJcbiAgICB5ID0gZm10d29yZFt0ICsgKChlY2NsZXZlbCAtIDEpIDw8IDMpXTtcclxuICAgIC8vIGxvdyBieXRlXHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrICwgeSA+Pj0gMSlcclxuICAgICAgaWYgKHkgJiAxKSB7XHJcbiAgICAgICAgcXJmcmFtZVsod2lkdGggLSAxIC0gaykgKyB3aWR0aCAqIDhdID0gMTtcclxuICAgICAgICBpZiAoayA8IDYpXHJcbiAgICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqIGtdID0gMTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBxcmZyYW1lWzggKyB3aWR0aCAqIChrICsgMSldID0gMTtcclxuICAgICAgfVxyXG4gICAgLy8gaGlnaCBieXRlXHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgNzsgaysrICwgeSA+Pj0gMSlcclxuICAgICAgaWYgKHkgJiAxKSB7XHJcbiAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA3ICsgayldID0gMTtcclxuICAgICAgICBpZiAoaylcclxuICAgICAgICAgIHFyZnJhbWVbKDYgLSBrKSArIHdpZHRoICogOF0gPSAxO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHFyZnJhbWVbNyArIHdpZHRoICogOF0gPSAxO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gcXJmcmFtZTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIHZhciBfY2FudmFzID0gbnVsbDtcclxuXHJcbiAgdmFyIGFwaSA9IHtcclxuXHJcbiAgICBnZXQgZWNjbGV2ZWwoKSB7XHJcbiAgICAgIHJldHVybiBlY2NsZXZlbDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0IGVjY2xldmVsKHZhbCkge1xyXG4gICAgICBlY2NsZXZlbCA9IHZhbDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IHNpemUoKSB7XHJcbiAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0IHNpemUodmFsKSB7XHJcbiAgICAgIF9zaXplID0gdmFsXHJcbiAgICB9LFxyXG5cclxuICAgIGdldCBjYW52YXMoKSB7XHJcbiAgICAgIHJldHVybiBfY2FudmFzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQgY2FudmFzKGVsKSB7XHJcbiAgICAgIF9jYW52YXMgPSBlbDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RnJhbWU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIGdlbmZyYW1lKHN0cmluZyk7XHJcbiAgICB9LFxyXG4gICAgLy/ov5nph4znmoR1dGYxNnRvOChzdHIp5piv5a+5VGV4dOS4reeahOWtl+espuS4sui/m+ihjOi9rOegge+8jOiuqeWFtuaUr+aMgeS4reaWh1xyXG4gICAgdXRmMTZ0bzg6IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgdmFyIG91dCwgaSwgbGVuLCBjO1xyXG5cclxuICAgICAgb3V0ID0gXCJcIjtcclxuICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmICgoYyA+PSAweDAwMDEpICYmIChjIDw9IDB4MDA3RikpIHtcclxuICAgICAgICAgIG91dCArPSBzdHIuY2hhckF0KGkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYyA+IDB4MDdGRikge1xyXG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhFMCB8ICgoYyA+PiAxMikgJiAweDBGKSk7XHJcbiAgICAgICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDgwIHwgKChjID4+IDYpICYgMHgzRikpO1xyXG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHg4MCB8ICgoYyA+PiAwKSAmIDB4M0YpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhDMCB8ICgoYyA+PiA2KSAmIDB4MUYpKTtcclxuICAgICAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ODAgfCAoKGMgPj4gMCkgJiAweDNGKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9LFxyXG4gICAgYmFzZTY0ZW5jb2RlOiBmdW5jdGlvbiAoc3RyKXtcclxuICAgICAgICB2YXIgb3V0LCBpLCBsZW47XHJcbiAgICAgICAgdmFyIGMxLCBjMiwgYzM7XHJcbiAgICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgICBpID0gMDtcclxuICAgICAgICBvdXQgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGMxID0gc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmY7XHJcbiAgICAgICAgICAgIGlmIChpID09IGxlbikge1xyXG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKTtcclxuICAgICAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKGMxICYgMHgzKSA8PCA0KTtcclxuICAgICAgICAgICAgICAgIG91dCArPSBcIj09XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjMiA9IHN0ci5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgICAgIGlmIChpID09IGxlbikge1xyXG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKTtcclxuICAgICAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMSAmIDB4MykgPDwgNCkgfCAoKGMyICYgMHhGMCkgPj4gNCkpO1xyXG4gICAgICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzIgJiAweEYpIDw8IDIpO1xyXG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYzMgPSBzdHIuY2hhckNvZGVBdChpKyspO1xyXG4gICAgICAgICAgICBvdXQgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpO1xyXG4gICAgICAgICAgICBvdXQgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpIHwgKChjMiAmIDB4RjApID4+IDQpKTtcclxuICAgICAgICAgICAgb3V0ICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMyICYgMHhGKSA8PCAyKSB8ICgoYzMgJiAweEMwKSA+PiA2KSk7XHJcbiAgICAgICAgICAgIG91dCArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzMgJiAweDNGKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgZHJhdzogZnVuY3Rpb24gKHN0ciwgY2FudmFzLCBjYXZXLCBjYXZILCBlY2MpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBlY2NsZXZlbCA9IGVjYyB8fCBlY2NsZXZlbDtcclxuICAgICAgY2FudmFzID0gY2FudmFzIHx8IF9jYW52YXM7XHJcbiAgICAgIGlmICghY2FudmFzKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdObyBjYW52YXMgcHJvdmlkZWQgdG8gZHJhdyBRUiBjb2RlIGluIScpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2l6ZSA9IE1hdGgubWluKGNhdlcsIGNhdkgpO1xyXG4gICAgICBzdHIgPSB0aGF0LnV0ZjE2dG84KHN0cik7Ly/lop7liqDkuK3mlofmmL7npLpcclxuXHJcbiAgICAgIHZhciBmcmFtZSA9IHRoYXQuZ2V0RnJhbWUoc3RyKSxcclxuICAgICAgICBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyksXHJcbiAgICAgICAgcHggPSBNYXRoLnJvdW5kKHNpemUgLyAod2lkdGggKyA4KSk7XHJcbiAgICAgIHZhciByb3VuZGVkU2l6ZSA9IHB4ICogKHdpZHRoICsgOCksXHJcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5mbG9vcigoc2l6ZSAtIHJvdW5kZWRTaXplKSAvIDIpO1xyXG4gICAgICBzaXplID0gcm91bmRlZFNpemU7XHJcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyNmZmZmZmYnKVxyXG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2F2VywgY2F2Vyk7XHJcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAwMDAnKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoZnJhbWVbaiAqIHdpZHRoICsgaV0pIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHB4ICogKDQgKyBpKSArIG9mZnNldCwgcHggKiAoNCArIGopICsgb2Zmc2V0LCBweCwgcHgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjdHguZHJhdygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBtb2R1bGUuZXhwb3J0cyA9IHsgYXBpIH1cclxuXHJcbn0pKCk7Il19