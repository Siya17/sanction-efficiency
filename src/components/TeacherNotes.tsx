type TeacherNotesProps = {
  note?: string;
};

export function TeacherNotes({ note }: TeacherNotesProps) {
  if (!note) {
    return null;
  }

  return (
    <details className="teacher-notes">
      <summary>Teacher note</summary>
      <p>{note}</p>
    </details>
  );
}
