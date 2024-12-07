export const normalizeText = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD') // Chuẩn hóa chuỗi thành dạng tổ hợp
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .replace('đ', 'd');