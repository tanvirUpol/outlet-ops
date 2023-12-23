import Sidebar from "@/components/Sidebar"


export const metadata = {
    title: 'Pulse | Dashboard',
    description: 'Made by Upol',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={` flex`}>
            <Sidebar />
            <div className='flex-1 p-4 overflow-auto'>
                {children}
            </div>
        </main>

    )
}
