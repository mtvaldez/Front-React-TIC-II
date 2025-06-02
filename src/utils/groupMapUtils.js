// Group Access Counts by doorName
export function groupAccessDataMap(arr) {
    const groupedMap = new Map();
    const allMap = new Map()

    arr.forEach((entry) => {
        const key = entry["doorName"];

        if (!groupedMap.has(key))
            groupedMap.set(key, []);

        groupedMap.get(key).push(entry);
    
        if(!allMap.has(entry.hour))
            allMap.set(entry.hour, {hour: entry.hour, "cameraCount": 0, "rfidCount": 0})
    
        allMap.get(entry.hour).cameraCount += entry.cameraCount;
        allMap.get(entry.hour).rfidCount += entry.rfidCount;

    });


    groupedMap.set("All", Array.from(allMap.values()))
    
    return groupedMap;
}

// Group Accesses by doorName
export function groupAccessListMap(arr) {
    const groupedMap = new Map();
    
    arr.forEach((entry) => {
        const key = entry["doorName"];
        
        if (!groupedMap.has(key))
            groupedMap.set(key, []);
        
        groupedMap.get(key).push(entry);
    });
    
    groupedMap.set("All", arr)
    return groupedMap;
  }