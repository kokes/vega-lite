/* tslint:disable quote */

import {assert} from 'chai';
import {parseUnitModel} from '../../util';
import {extend} from '../../../src/util'
import {X, Y, COLOR} from '../../../src/channel';
import {line} from '../../../src/compile/mark/line';

describe('Mark: Line', function() {
  it('should return the correct mark type', function() {
    assert.equal(line.markType(), 'line');
  });

  function lineXY(moreEncoding = {}) {
    const spec = {
      "mark": "line",
      "encoding": extend(
        {
          "x": {"field": "year", "type": "ordinal"},
          "y": {"field": "yield", "type": "quantitative"}
        },
        moreEncoding
      ),
      "data": {"url": "data/barley.json"}
    };
    return spec;
  }

  describe('with x, y', function() {
    const model = parseUnitModel(lineXY());
    const props = line.properties(model);

    it('should have scale for x', function() {
      assert.deepEqual(props.x, {scale: X, field: 'year'});
    });

    it('should have scale for y', function(){
      assert.deepEqual(props.y, {scale: Y, field: 'yield'});
    });
  });

  describe('with x, y, color', function () {
    const model = parseUnitModel(lineXY({
      "color": {"field": "Acceleration", "type": "quantitative"}
    }));
    const props = line.properties(model);

    it('should have scale for color', function () {
      assert.deepEqual(props.stroke, {scale: COLOR, field: 'Acceleration'});
    });
  });

  describe('with x of type longitude', function() {
    const model = parseUnitModel({
      "mark": "line",
      "encoding": {
        "x": {"field": "year", "type": "longitude"}
      },
      "data": {"url": "data/barley.json"}
    });

    const props = line.properties(model);
    it('should not have scale on x', function() {
      assert.deepEqual(props.x.scale, undefined);
    });
  });

  describe('with y of type latitude', function() {
    const model = parseUnitModel({
      "mark": "line",
      "encoding": {
        "y": {"field": "year", "type": "latitude"}
      },
      "data": {"url": "data/barley.json"}
    });

    const props = line.properties(model);
    it('should not have scale on y', function() {
      assert.deepEqual(props.y.scale, undefined);
    });
  });
});
