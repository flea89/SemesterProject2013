'use strict';

angular.module('publicApp')
  .factory('mergeLine', function () {
 function mergeLinesInArrayTable(lines) {
        var max = lines[0].max('title'),
            min = lines[0].min('title'),
            data = [],
            inserted,
            newPoint, group, groupOfLine;
        lines.forEach(function(line) {
            var maxOfLine = line.max('title'),
                minOfLine = line.min('title');

            if (maxOfLine > max) {
                max = maxOfLine;
            }
            if (minOfLine < min) {
                min = minOfLine;
            }
        });

        var titles = [];

        lines.forEach(function(el) {
            titles = titles.concat(el.map(function(e) {
                return e.title;
            }));
        });
        titles = titles.unique();
        titles.sort();
        titles.forEach(function(title, index) {
            group = {
                title: title,
                array: []
            };
            inserted = false;
            for (var j = 0; j < lines.length; j++) {
                groupOfLine = lines[j].getByProperty('title', title);
                if (groupOfLine) {
                    groupOfLine.array.forEach(function(point) {
                        newPoint = new Array(lines.length + 1);
                        newPoint.forEach(function(el) {
                            el = undefined;
                        });
                        newPoint[0] = point[0];
                        newPoint[j + 1] = point[1];
                        group.array.push(newPoint);
                        inserted = true;
                    });
                }

            }
            if (inserted) data.push(group);
        });
        return data;
    }
    return {
      mergeLinesInArrayTable: mergeLinesInArrayTable
    };
  });
