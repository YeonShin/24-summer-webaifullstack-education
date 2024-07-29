module.exports = function (sequelize, DataTypes) {
  // DB 서버와 연결정보를 가진 sequelize객체의 define()메소드를 호출하여
  // 1:1 매핑되는 물리적 테이블과 매핑되는 데이터 모델의 구조를 정의한다.
  // define('물리적 테이블명-단수형', 관리항목정의(컬럼), 추가옵션);
  // 단수형의 테이블명은 복수형의 물리적테이블명이 생성된다.
  return sequelize.define(
    "member",
    {
      member_id: {
        type: DataTypes.INTEGER, // ORM Framework에서 지원해주는 데이터타입
        autoIncrement: true, // 자동채반되는 컬럼(AI)의 속성이 추가됨
        primaryKey: true, // 현재 컬럼을 PK(기본키)로 설정
        allowNull: false, // NOT NULL 으로 설정-반드시 값이 입력되어야함.
        comment: "회원고유번호",
      },
      email: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
        comment: "사용자메일주소",
      },
      name: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
        comment: "회원명",
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "가입일시",
      },
    },
    {
      timestamps: true, // 등록일시(createdAt), 수정일시(updatedAt) 컬럼을 자동으로 생성한다. => 직접 컬럼을 생성할 필요 X
      paranoid: true, // 해당 테이블의 실제 데이터를 삭제하지 않고 deletedAt이라는 컬럼을 생성하고 삭제시 삭제일시를 저장합니다.
    }
  );
};
