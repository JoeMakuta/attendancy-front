"use client";
import RepportTable from "@/components/dashboard/repportTable";
import StudentRepportTable from "@/components/students/studentRepportTable";

const Students = () => {
  return (
    <section className=" flex flex-col gap-4 ">
      <h1>Tous les apprenants</h1>
      <StudentRepportTable />
    </section>
  );
};

export default Students;
