import {testData} from "./testData.mjs";
import {groupAndTemporalSort,temporalUnit,sortOrder,finalElementSchema} from "./index.mjs";
import { strict as assert } from 'assert';
import _ from "lodash";

let groupAndTemporalSortCollection = groupAndTemporalSort(
    {collection:testData,unit:temporalUnit.MINUTE,temporalOrder:sortOrder.descending,
        temporalPropertyName:"date",groupPropertyName:"group-1",groupOrder:sortOrder.ascending});       

assert(groupAndTemporalSortCollection.flatMap(e=>e.entries).length == testData.length, "size should be the same");
