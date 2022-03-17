import {testData} from "./testData.js";
import {groupAndTemporalSort,temporalUnit,sortOrder,finalElementSchema} from "./index.js";
import { strict as assert } from 'assert';
import _ from "lodash";

let groupAndTemporalSortCollection = groupAndTemporalSort(
    {collection:testData,unit:temporalUnit.DAY,temporalOrder:sortOrder.descending,
        temporalPropertyName:"date",groupPropertyName:"group-1",groupOrder:sortOrder.ascending});        

assert(groupAndTemporalSortCollection.flatMap(e=>e.entries).length == testData.length, "the collection size is not the same size");