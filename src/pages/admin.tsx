import React, { useEffect, useState } from "react";
import { Container } from "../components/container";
import { ModalAccounts } from "../components/modal-accounts";
import { IAccount } from "../type";
import { ModalAdmin } from "../components/modal-admin";
import axios from "axios";

export const userID = "admin1"; // string
export const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    return (
        <Container>
        <div>
            <div className="flex flex-row">
            <div className="flex w-[100%]">
                {/* admin */}
                {isAdmin && <ModalAdmin />}
            </div>
            </div>
        </div>
        </Container>
    );
};
