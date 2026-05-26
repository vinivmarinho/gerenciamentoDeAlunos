export function getTotalMonthlyFees(students) {
    /* reduce => Percorre o array acumulando um valor*/
    return students.reduce((total, student) => {
        /* Se monthlyFee vier vazio, retorna 0*/
        if (student.status.toLowerCase() === "ativo") {
            return total + Number(student.monthlyFee || 0);
        }
        return total;
    }, 0)
}


export function getActiveStudentsPercentage(students) {
    if (!students.length) return 0;

    const activeCount = students.filter(
        (student) => student.status?.toLowerCase() === "ativo"
    ).length;

    return Math.round((activeCount / students.length) * 100);
}

export function getActiveStudents(students) {
    if (!students.length) return 0;

    const activeCount = students.filter((student) => student.status?.toLowerCase() === "ativo").length;
    
    return activeCount;
}

export function getStudentsCountByShift(students) {
    const matutino = students.filter((student) => student.studentShift === "Matutino").length;
    const vespertino = students.filter((student) => student.studentShift === "Vespertino").length;
    const noturno = students.filter((student) => student.studentShift === "Noturno").length;

    return { matutino, vespertino, noturno};
}