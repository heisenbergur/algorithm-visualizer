const getPartition = (
  array,
  startIdx,
  endIdx,
  animations
) => {
  let pivot = array[endIdx];
  let i = (startIdx - 1);
  for (let j = startIdx; j <= endIdx - 1; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  [array[i+1], array[endIdx]] = [array[endIdx], array[i+1]];
  return i + 1;
}

const quickSortHelper =(
  array,
  startIdx,
  endIdx,
  animations,
) => {
  let stack = new Array(endIdx - startIdx + 1);
  stack.fill(0);
  let top = -1;
  stack[++top] = startIdx;
  stack[++top] = endIdx;
  while (top >= 0) {
    endIdx = stack[top--];
    startIdx = stack[top--];
    let partition = getPartition(array, startIdx, endIdx, animations);
    if (partition - 1 > startIdx) {
      stack[++top] = startIdx;
      stack[++top] = partition - 1;
    }
    if (partition + 1 < endIdx) {
      stack[++top] = partition + 1;
      stack[++top] = endIdx;
    }
  }
}

export const quickSort = array => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(array, 0, array.length - 1, animations);
  console.log(array);
  return animations;
}

// -------------------------------------------------------------------------------------- //

export const bubbleSort = array => {
  const animations = [];
  let k=0;
  while(k<array.length) {
      let i=1;
      while(i<(array.length-k)) {
          animations.push([i, i-1]);
          animations.push([i, i-1]);
          if(array[i-1]>array[i]) {
            [array[i-1],array[i]]=[array[i],array[i-1]];
          }
            animations.push([i, array[i]]);
            animations.push([i, i-1]);
            animations.push([i, i-1]);
            animations.push([i-1, array[i-1]]);
          i++;
      }
      k++;
  }
  return animations;
}


// -------------------------------------------------------------------------------------- //


export const mergeSort = array => {
  const animations = [];
  // console.log(array);
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

const mergeSortHelper =(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

const doMerge = (
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}