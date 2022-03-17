# Temporal group and sort wrapper
## install with
npm install
## test with 
npm test

### The module will:
- group a collection by the group property specified  
- split each main group by the temporal attribute specified
- sort each element inside the related group according to the sorting attributes specified

### Example of usage: 
    groupAndTemporalSort({
            collection:testData,unit:temporalUnit.DAY,temporalOrder:sortOrder.descending,
            temporalPropertyName:"date",groupPropertyName:"group-1",groupOrder:sortOrder.ascending
    });  