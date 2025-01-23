
export const WPGPXMAPS = {
    Utils: {
        DividePolylinesPoints(mapData: any[]): any[] {
            let lastCut = 0;
            const result: any[] = [];
            const _len = mapData.length;

            for (let i = 0; i < _len; i++) {
                if (mapData[i] === null) {
                    result.push(mapData.slice(lastCut === 0 ? 0 : lastCut + 1, i));
                    lastCut = i;
                }
            }
            if ((_len - 1) !== lastCut) {
                result.push(mapData.slice(lastCut));
            }
            return result;
        },

        GetItemFromArray(arr: Array<[number,number]|null>, index: number): [number,number] | null {
            try {
                return arr[index];
            } catch (e) {
                return [0, 0];
            }
        }
    },

};