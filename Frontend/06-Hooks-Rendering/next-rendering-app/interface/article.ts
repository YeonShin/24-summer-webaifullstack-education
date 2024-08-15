export default interface IArticle {
    article_id: number;
    board_type_code: number;
    title: string;
    article_type_cpde: number;
    content: string;
    view_count: number;
    ip_address: string;
    is_display_code: number;
    reg_date: string;
    reg_member_id: number;
    edit_date: string | null;
    edit_member_id: number | null;
}