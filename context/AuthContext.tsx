"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Role = 'team' | 'judge' | 'volunteer' | 'admin' | 'superadmin' | 'event-coordinator' | null;

interface AuthContextType {
    user: { role: Role; id?: string; teamId?: string; name?: string; eventSlug?: string } | null;
    login: (role: Role, data?: { id?: string; teamId?: string; name?: string; eventSlug?: string }) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ role: Role; id?: string; teamId?: string; name?: string; eventSlug?: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedRole = localStorage.getItem("vhack_role") as Role;
        const savedId = localStorage.getItem("vhack_id");
        const savedTeamId = localStorage.getItem("vhack_team_id");
        const savedName = localStorage.getItem("vhack_name");
        const savedEventSlug = localStorage.getItem("vhack_event_slug");

        if (savedRole) {
            setUser({
                role: savedRole,
                id: savedId || undefined,
                teamId: savedTeamId || undefined,
                name: savedName || undefined,
                eventSlug: savedEventSlug || undefined
            });
        }
        setIsLoading(false);
    }, []);

    const login = (role: Role, data?: { id?: string; teamId?: string; name?: string; eventSlug?: string }) => {
        localStorage.setItem("vhack_role", role as string);
        if (data?.id) localStorage.setItem("vhack_id", data.id);
        if (data?.teamId) localStorage.setItem("vhack_team_id", data.teamId);
        if (data?.name) localStorage.setItem("vhack_name", data.name);
        if (data?.eventSlug) localStorage.setItem("vhack_event_slug", data.eventSlug);

        setUser({ role, ...data });

        if (role === "event-coordinator" && data?.eventSlug) {
            router.push(`/dashboard/event-coordinator/${data.eventSlug}`);
            return;
        }

        router.push(`/dashboard/${role}`);
    };

    const logout = () => {
        localStorage.removeItem("vhack_role");
        localStorage.removeItem("vhack_id");
        localStorage.removeItem("vhack_team_id");
        localStorage.removeItem("vhack_name");
        localStorage.removeItem("vhack_event_slug");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
