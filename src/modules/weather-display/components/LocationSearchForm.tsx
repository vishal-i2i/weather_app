import { Formik, Form, Field } from "formik";

interface LocationSearchValues {
  query: string;
}

/**
 * Scaffold only: submit is a no-op placeholder. Wiring to real location
 * search/lookup behavior is owned by a later work order.
 */
export function LocationSearchForm() {
  return (
    <Formik<LocationSearchValues>
      initialValues={{ query: "" }}
      onSubmit={() => {
        // Intentionally no-op: search behavior is out of scope for this work order.
      }}
    >
      <Form>
        <label htmlFor="location-query">Location</label>
        <Field id="location-query" name="query" type="text" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
