import NewStudentForm from "@/components/students/newStudent";

const NewStudent = () => {
  return (
    <div className=" flex flex-col gap-6 justify-center items-center w-full ">
      <div className=" font-bold text-2xl ">Ajouter Nouvel apprenant</div>
      <NewStudentForm />
    </div>
  );
};

export default NewStudent;
