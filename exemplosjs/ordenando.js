const add = () => {
    const valor = document.getElementById("valor").value;
    const valores = document.getElementById("valores");
    const node = document.createElement("li");
    const textNode = document.createTextNode(valor);
    node.appendChild(textNode);
    valores.appendChild(node);
};

const ordenar = () => {
    const valores = document.getElementById("valores");
    const algoritmo = document.getElementById("algoritmo").value;
    const vetor = Array.from(valores.children).map(item => parseInt(item.innerHTML));
    switch (algoritmo) {
        case "bubble":
        bubble_sort(vetor);
        break;
        case "selection":
        selection_sort(vetor);
        break;
        case "quick":
        quick_sort(vetor, 0, vetor.length - 1);
        break;
    }
    const novoHTML = vetor.reduce((html, valor) => html + `<li>${valor}</li>`, "");
    valores.innerHTML = novoHTML;
};

const misturar = () => {
    const valores = document.getElementById("valores");
    const vetor = Array.from(valores.children).map(item => parseInt(item.innerHTML));
    shuffle(vetor, vetor.length);
    const novoHTML = vetor.reduce((html, valor) => html + `<li>${valor}</li>`, "");
    valores.innerHTML = novoHTML;
}

// Função para trocar os valores de duas posições de um vetor
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

// Função para embaralhar os elementos de um vetor
const shuffle = (arr, numSwaps) => {
    for (let i = 0; i < numSwaps; i++) {
        const idx1 = Math.floor(Math.random() * arr.length);
        const idx2 = Math.floor(Math.random() * arr.length);
        swap(arr, idx1, idx2);
    }
};

// Função para ordenar um vetor de inteiros com o algoritmo Bubble Sort
const bubble_sort = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
};

// Função para ordenar um vetor de inteiros utilizando o algoritmo Selection Sort
const selection_sort = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr, i, min_idx);
    }
};

// Função de particionamento, de apoio a quick_sort
const particionamento = (arr, inicio, fim, pivot) => {
    let i = inicio;
    let j = fim;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
};

// Função para ordenar um vetor de inteiros com o algoritmo Quick Sort, recursivo
const quick_sort = (arr, inicio, fim) => {
    if (inicio < fim) {
        const pivot = arr[Math.floor((inicio + fim) / 2)];
        const index = particionamento(arr, inicio, fim, pivot);
        quick_sort(arr, inicio, index - 1);
        quick_sort(arr, index, fim);
    }
};
