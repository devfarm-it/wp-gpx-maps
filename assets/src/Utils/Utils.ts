
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
        },

        calculateGrade(altitudes : number[], distances: number[]): number[] {
            if (altitudes.length !== distances.length + 1) {
                throw new Error("The number of altitude points must be one more than the number of distances.");
            }
        
            const grades = [];
            for (let i = 0; i < distances.length; i++) {
                const elevationChange = altitudes[i + 1] - altitudes[i];
                const grade = (elevationChange / distances[i]) * 100;
                grades.push(grade);
            }
        
            return grades;
        },
        
         getGradientColor(grade) {
            // Define the color stops
            const colorStops = [
                { grade: 0, color: [0, 255, 0] },      // Green: 0%
                { grade: 5, color: [255, 255, 0] },    // Yellow: 5%
                { grade: 15, color: [255, 0, 0] }      // Red: 15%
            ];
        
            // Function to interpolate between two colors
            function interpolateColor(color1, color2, factor) {
                const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
                return `rgb(${result.join(",")})`;
            }
        
            // Find the appropriate color range
            let startStop, endStop;
            for (let i = 0; i < colorStops.length - 1; i++) {
                if (grade <= colorStops[i + 1].grade) {
                    startStop = colorStops[i];
                    endStop = colorStops[i + 1];
                    break;
                }
            }
            
            // Calculate the interpolation factor
            const factor = (grade - startStop.grade) / (endStop.grade - startStop.grade);
        
            // Return the interpolated color
            return interpolateColor(startStop.color, endStop.color, factor);
        },
        

    },

};