import React from "react";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function InputForm({ ticketList }) {
  return (
    <ExcelFile
      filename="OFC REPORT"
      element={
        ticketList.length === 0 ? null : (
          <div className="mb-3" id="_dis2">
            <div className="col-sm-offset-2 col-sm-12">
              <button className="btn btn-success btn-lg form-button">
                Download Excel File
              </button>
            </div>
          </div>
        )
      }
    >
      <ExcelSheet data={ticketList} name="FIBRE_SWITCH">
        <ExcelColumn label="S/N" value="" />
        <ExcelColumn label="TERMINAL A" value="nodeA" />
        <ExcelColumn label="TERMINAL B" value="nodeB" />
        <ExcelColumn label="VENDOR" value="vendor" />
        <ExcelColumn label="IMPACT" value="impact" />
        <ExcelColumn label="ROUTE" value="route" />
        <ExcelColumn label="FROM (DATE & TIME)" value="timeDown" />
        <ExcelColumn label="TO (DATE & TIME)" value="timeUp" />
        <ExcelColumn label="TTR (HRS)" value="TTR" />
        <ExcelColumn label="RDT (HRS)" value="RDT" />
        <ExcelColumn
          label="SITE ID OF OFC ISSUE WITH POWER"
          value="siteIDWithPowerFailure"
        />
        <ExcelColumn label="PROBLEM/SPECIFIC CAUSE" value="COF" />
        <ExcelColumn label="ACTION TAKEN" value="action" />
        <ExcelColumn label="BY WHOM" value="byWhom" />
        <ExcelColumn label="SUBSYSTEM" value="subSystem" />
      </ExcelSheet>
    </ExcelFile>
  );
}
