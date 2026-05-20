export function getTotalMonthlyFees(students) {
    /* reduce => Percorre o array acumulando um valor*/
    return students.reduce((total, student) => {
        /* Se monthlyFee vier vazio, retorna 0*/
        return total + Number(student.monthlyFee || 0);
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