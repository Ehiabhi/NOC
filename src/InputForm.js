import React from "react";

export default function InputForm({
  UtilsUpdateChangeHandler,
  setFormData,
  formData,
  registerFailure,
}) {
  return (
    <form
      className="form-horizontal"
      onSubmit={(e) => registerFailure(e, formData)}
      method="POST"
    >
      <div className="form-group">
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            placeholder="Terminal A"
            name="nodeA"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.nodeA}
            required
          />
        </div>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            placeholder="Terminal B"
            name="nodeB"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.nodeB}
            required
          />
        </div>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            placeholder="Vendor"
            name="vendor"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.vendor}
            required
          />
        </div>
        <div className="col-sm-2">
          <input
            type="datetime-local"
            className="form-control"
            placeholder="From"
            name="timeDown"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.timeDown}
          />
        </div>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            placeholder="Site with power issue"
            name="OFCsiteWithPowerIssue"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.OFCsiteWithPowerIssue}
          />
        </div>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            placeholder="By Whom"
            name="byWhom"
            onChange={(e) => UtilsUpdateChangeHandler(e, setFormData)}
            value={formData.byWhom}
            required
          />
        </div>
        {/* <div className="col-sm-2">
        <label htmlFor="">Delete Ticket without confirmation</label>
        <input
          type="checkbox"
          className="form-control"
          id="deleteConfirm"
          name="deleteConfirm"
          onChange={(e) => UtilsUpdateChangeHandler(e)}
          value={formData.deleteConfirm}
        />
      </div> */}
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-12">
          <button type="submit" className="btn btn-outline-success form-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
