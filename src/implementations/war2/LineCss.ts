
// export function LineCss(pointA, pointB, stroke) {
//   this.pointA = pointA;
//   this.pointB = pointB;
//   this.stroke = stroke != null ? stroke : 1;
// }

// (LineCss as any).forPointsWithStroke = function(pointA, pointB, stroke) {
//   let a;
//   a = new LineCss(pointA, pointB, stroke);
//   return a.schema();
// };

// LineCss.prototype.schema = function() {
//   return {
//     left: this._x(),
//     top: this._y(),
//     width: Math.round(this._hypotenuseLength()),
//     height: this.stroke,
//     degrees: this._rotationDegrees()
//   };
// };

// LineCss.prototype._x = function() {
//   let offset;
//   offset = Math.round(Math.abs((this._hypotenuseLength() - this._adjacentLength()) / 2));
//   if (this.pointB.x <= this.pointA.x) {
//     return this.pointB.x - offset;
//   } else {
//     return this.pointA.x - offset;
//   }
// };

// LineCss.prototype._y = function() {
//   let offset;
//   offset = Math.round((-1 * this._oppositeLength() / 2) - (this.stroke / 2));
//   if (this.pointB.y <= this.pointA.y) {
//     return this.pointA.y + offset;
//   } else {
//     return this.pointB.y + offset;
//   }
// };

// LineCss.prototype._rotationRadians = function() {
//   const radians = ()=> {
//     return Math.atan(this._oppositeLength() / this._adjacentLength());
//   };
//   if (this.pointB.x < this.pointA.x && this.pointB.y < this.pointA.y) {
//     return radians();
//   } else if (this.pointB.x > this.pointA.x && this.pointB.y > this.pointA.y) {
//     return radians();
//   } else if (this._adjacentLength() === 0) {
//     return Math.PI / 2;
//   } else {
//     return -radians();
//   }
// };

// LineCss.prototype._rotationDegrees = function() {
//   return this._rotationRadians() * 180 / Math.PI;
// };

// LineCss.prototype._adjacentLength = function() {
//   return Math.abs(this.pointA.x - this.pointB.x);
// };

// LineCss.prototype._oppositeLength = function() {
//   return Math.abs(this.pointA.y - this.pointB.y);
// };

// LineCss.prototype._hypotenuseLength = function() {
//   return Math.sqrt(Math.pow(this._adjacentLength(), 2) + Math.pow(this._oppositeLength(), 2));
// };
