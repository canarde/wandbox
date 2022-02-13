import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useParams } from "remix";
import { wandboxSlice } from "~/features/slice";
import { PermlinkData } from "~/hooks/permlink";
import { AppState, useAppDispatch } from "~/store";

interface TitleProps {
  className?: string;
  permlinkData: PermlinkData | null;
}

const Title: React.FC<TitleProps> = (props) => {
  const { className, permlinkData } = props;
  const { title, description } = useSelector(
    ({ wandbox: { title, description } }: AppState) => ({ title, description })
  );
  const dispatch = useAppDispatch();
  const actions = wandboxSlice.actions;
  const [show, setShow] = React.useState<boolean>(false);
  const [editingTitle, setEditingTitle] = React.useState<string>("");
  const [editingDescription, setEditingDescription] =
    React.useState<string>("");

  return (
    <div className={`${className} d-flex flex-column gap-8px`}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h4
            className={`d-flex align-self-end flex-grow ${
              permlinkData !== null ? "text-info" : ""
            }`}
          >
            {permlinkData === null ? title : permlinkData.parameter.title}
          </h4>
        </div>
        {permlinkData === null && (
          <Button
            variant="link"
            onClick={() => {
              setEditingTitle(title);
              setEditingDescription(description);
              setShow(true);
            }}
          >
            <Pencil />
          </Button>
        )}
      </div>
      <div style={{ borderBottom: "#d0d7de solid 1px" }}></div>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {permlinkData === null
          ? description
          : permlinkData.parameter.description}
      </p>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body className="d-flex flex-column">
          <button
            type="button"
            className="justify-content-start align-self-end btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setShow(false)}
          />
          <div className="d-flex flex-column gap-16px">
            <div className="d-flex flex-column gap-4px">
              <label>Title</label>
              <Form.Control
                type="input"
                placeholder="Title"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.currentTarget.value)}
              />
            </div>
            <div className="d-flex flex-column gap-4px">
              <label>Description</label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Description"
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.currentTarget.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(actions.setTitle(editingTitle));
              dispatch(actions.setDescription(editingDescription));
              setShow(false);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { Title };
