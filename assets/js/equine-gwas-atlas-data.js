(function () {
  "use strict";

  /*
   * ============================================================
   * EQUINE GWAS ATLAS DATA EXPLORER
   * ============================================================
   *
   * The GitHub repository is the canonical source of the data.
   *
   * The website does NOT contain a second copy of the datasets.
   *
   * Expected repository structure:
   *
   * data/
   *   publications.csv
   *   studies.csv
   *   loci.csv
   *
   * ============================================================
   */

  const DATA_BASE =
    "https://raw.githubusercontent.com/victorialindsaymcgee/equine-gwas-atlas/main/data/";

  const GITHUB_REPOSITORY =
    "https://github.com/victorialindsaymcgee/equine-gwas-atlas";

  const DATASETS = {
    publications: {
      label: "Publications",
      description:
        "Publication-level information from the Equine GWAS Atlas.",
      file: "publications.csv"
    },

    studies: {
      label: "Studies",
      description:
        "Characteristics and methodology of individual GWAS analyses.",
      file: "studies.csv"
    },

    loci: {
      label: "Loci",
      description:
        "Reported genomic loci and associated evidence and annotation.",
      file: "loci.csv"
    }
  };

  let currentDataset = "publications";
  let currentHeaders = [];
  let currentRows = [];

  /*
   * ============================================================
   * Elements
   * ============================================================
   */

  const table = document.getElementById("gwas-atlas-table");

  const tableContainer = document.getElementById(
    "gwas-atlas-table-container"
  );

  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  const search = document.getElementById("gwas-atlas-search");
  const clear = document.getElementById("gwas-atlas-clear");

  const count = document.getElementById("gwas-atlas-count");
  const status = document.getElementById("gwas-atlas-status");

  const empty = document.getElementById("gwas-atlas-empty");
  const emptyMessage = document.getElementById(
    "gwas-atlas-empty-message"
  );

  const download = document.getElementById(
    "gwas-atlas-download"
  );

  const datasetTitle = document.getElementById(
    "gwas-atlas-dataset-title"
  );

  const datasetDescription = document.getElementById(
    "gwas-atlas-dataset-description"
  );

  /*
   * ============================================================
   * CSV parser
   * ============================================================
   */

  function parseCSV(text) {
    const rows = [];

    let row = [];
    let value = "";
    let quoted = false;

    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      const next = text[i + 1];

      /*
       * Escaped double quote inside a quoted field.
       */

      if (
        character === '"' &&
        quoted &&
        next === '"'
      ) {
        value += '"';
        i++;
        continue;
      }

      /*
       * Opening or closing quote.
       */

      if (character === '"') {
        quoted = !quoted;
        continue;
      }

      /*
       * End of field.
       */

      if (
        character === "," &&
        !quoted
      ) {
        row.push(value);
        value = "";
        continue;
      }

      /*
       * End of row.
       */

      if (
        (
          character === "\n" ||
          character === "\r"
        ) &&
        !quoted
      ) {
        /*
         * Handle Windows-style line endings.
         */

        if (
          character === "\r" &&
          next === "\n"
        ) {
          i++;
        }

        row.push(value);
        value = "";

        /*
         * Ignore completely blank rows.
         */

        if (
          row.some(
            (cell) =>
              cell.trim() !== ""
          )
        ) {
          rows.push(row);
        }

        row = [];

        continue;
      }

      value += character;
    }

    /*
     * Handle the final row if the CSV does not
     * end with a newline.
     */

    if (
      value !== "" ||
      row.length > 0
    ) {
      row.push(value);
      rows.push(row);
    }

    return rows;
  }

  /*
   * ============================================================
   * Helpers
   * ============================================================
   */

  function formatHeader(header) {
    return String(header || "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(
        /\b\w/g,
        (letter) => letter.toUpperCase()
      );
  }

  function normalise(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  /*
   * ============================================================
   * Render table
   * ============================================================
   */

  function renderTable() {
    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!currentHeaders.length) {
      tableContainer.hidden = true;
      return;
    }

    const query = normalise(search.value);

    const filteredRows = currentRows.filter(
      (row) => {
        if (!query) {
          return true;
        }

        return row
          .map(normalise)
          .some(
            (value) =>
              value.includes(query)
          );
      }
    );

    /*
     * Header
     */

    const headerRow =
      document.createElement("tr");

    currentHeaders.forEach(
      (header) => {
        const th =
          document.createElement("th");

        th.scope = "col";

        th.textContent =
          formatHeader(header);

        headerRow.appendChild(th);
      }
    );

    thead.appendChild(headerRow);

    /*
     * Rows
     */

    filteredRows.forEach(
      (row) => {
        const tr =
          document.createElement("tr");

        currentHeaders.forEach(
          function (_, index) {
            const td =
              document.createElement("td");

            td.textContent =
              row[index] || "";

            tr.appendChild(td);
          }
        );

        tbody.appendChild(tr);
      }
    );

    /*
     * Count
     */

    count.textContent =
      filteredRows.length +
      " of " +
      currentRows.length +
      " record" +
      (
        currentRows.length === 1
          ? ""
          : "s"
      );

    /*
     * Search with no results
     */

    if (
      filteredRows.length === 0 &&
      currentRows.length > 0
    ) {
      tableContainer.hidden = true;
      empty.hidden = false;

      emptyMessage.textContent =
        "No records match your search.";
    } else {
      tableContainer.hidden = false;
      empty.hidden = true;
    }
  }

  /*
   * ============================================================
   * Dataset unavailable
   * ============================================================
   */

  function showUnavailable(message) {
    tableContainer.hidden = true;
    empty.hidden = false;

    emptyMessage.textContent = message;

    count.textContent = "No records";

    currentHeaders = [];
    currentRows = [];
  }

  /*
   * ============================================================
   * Load dataset directly from GitHub
   * ============================================================
   */

  async function loadDataset(datasetName) {
    const dataset = DATASETS[datasetName];

    if (!dataset) {
      return;
    }

    currentDataset = datasetName;

    datasetTitle.textContent =
      dataset.label;

    datasetDescription.textContent =
      dataset.description;

    search.value = "";

    currentHeaders = [];
    currentRows = [];

    tableContainer.hidden = true;
    empty.hidden = true;

    count.textContent = "Loading…";

    status.textContent =
      "Loading " +
      dataset.label.toLowerCase() +
      "…";

    status.classList.remove("is-error");

    /*
     * Direct link to the canonical
     * GitHub CSV.
     */

    const csvURL =
      DATA_BASE + dataset.file;

    download.href = csvURL;

    try {
      const response = await fetch(
        csvURL,
        {
          cache: "no-cache"
        }
      );

      if (!response.ok) {
        throw new Error(
          "HTTP " + response.status
        );
      }

      const text =
        await response.text();

      const parsed =
        parseCSV(text);

      if (parsed.length === 0) {
        showUnavailable(
          "This dataset is currently empty."
        );

        return;
      }

      /*
       * First CSV row =
       * column headings.
       */

      currentHeaders = parsed[0];

      /*
       * Remaining rows =
       * records.
       */

      currentRows = parsed.slice(1);

      if (currentRows.length === 0) {
        showUnavailable(
          "The table structure is available, but no records have been added yet."
        );

        return;
      }

      renderTable();

      status.textContent =
        dataset.label +
        " loaded directly from the Atlas GitHub repository.";
    } catch (error) {
      console.error(
        "Equine GWAS Atlas:",
        error
      );

      showUnavailable(
        "This dataset could not be loaded from the Atlas GitHub repository. Please try again later or view the dataset directly on GitHub."
      );

      status.textContent =
        "Unable to load " +
        dataset.label.toLowerCase() +
        ".";

      status.classList.add("is-error");
    }
  }

  /*
   * ============================================================
   * Tabs
   * ============================================================
   */

  document
    .querySelectorAll(
      ".gwas-atlas-data__tab"
    )
    .forEach(
      (tab) => {
        tab.addEventListener(
          "click",
          function () {
            document
              .querySelectorAll(
                ".gwas-atlas-data__tab"
              )
              .forEach(
                (button) => {
                  button.classList.remove(
                    "is-active"
                  );

                  button.setAttribute(
                    "aria-selected",
                    "false"
                  );
                }
              );

            this.classList.add(
              "is-active"
            );

            this.setAttribute(
              "aria-selected",
              "true"
            );

            loadDataset(
              this.dataset.dataset
            );
          }
        );
      }
    );

  /*
   * ============================================================
   * Search
   * ============================================================
   */

  search.addEventListener(
    "input",
    function () {
      renderTable();
    }
  );

  /*
   * ============================================================
   * Clear
   * ============================================================
   */

  clear.addEventListener(
    "click",
    function () {
      search.value = "";

      renderTable();

      search.focus();
    }
  );

  /*
   * ============================================================
   * Initial dataset
   * ============================================================
   */

  loadDataset(currentDataset);
})();
