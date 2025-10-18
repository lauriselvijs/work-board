/* eslint-disable no-useless-escape */
const Ziggy = {
    url: "http://laravel.test",
    port: null,
    defaults: {},
    routes: {
        "horizon.stats.index": {
            uri: "horizon/api/stats",
            methods: ["GET", "HEAD"],
        },
        "horizon.workload.index": {
            uri: "horizon/api/workload",
            methods: ["GET", "HEAD"],
        },
        "horizon.masters.index": {
            uri: "horizon/api/masters",
            methods: ["GET", "HEAD"],
        },
        "horizon.monitoring.index": {
            uri: "horizon/api/monitoring",
            methods: ["GET", "HEAD"],
        },
        "horizon.monitoring.store": {
            uri: "horizon/api/monitoring",
            methods: ["POST"],
        },
        "horizon.monitoring-tag.paginate": {
            uri: "horizon/api/monitoring/{tag}",
            methods: ["GET", "HEAD"],
            parameters: ["tag"],
        },
        "horizon.monitoring-tag.destroy": {
            uri: "horizon/api/monitoring/{tag}",
            methods: ["DELETE"],
            wheres: { tag: ".*" },
            parameters: ["tag"],
        },
        "horizon.jobs-metrics.index": {
            uri: "horizon/api/metrics/jobs",
            methods: ["GET", "HEAD"],
        },
        "horizon.jobs-metrics.show": {
            uri: "horizon/api/metrics/jobs/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "horizon.queues-metrics.index": {
            uri: "horizon/api/metrics/queues",
            methods: ["GET", "HEAD"],
        },
        "horizon.queues-metrics.show": {
            uri: "horizon/api/metrics/queues/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "horizon.jobs-batches.index": {
            uri: "horizon/api/batches",
            methods: ["GET", "HEAD"],
        },
        "horizon.jobs-batches.show": {
            uri: "horizon/api/batches/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "horizon.jobs-batches.retry": {
            uri: "horizon/api/batches/retry/{id}",
            methods: ["POST"],
            parameters: ["id"],
        },
        "horizon.pending-jobs.index": {
            uri: "horizon/api/jobs/pending",
            methods: ["GET", "HEAD"],
        },
        "horizon.completed-jobs.index": {
            uri: "horizon/api/jobs/completed",
            methods: ["GET", "HEAD"],
        },
        "horizon.silenced-jobs.index": {
            uri: "horizon/api/jobs/silenced",
            methods: ["GET", "HEAD"],
        },
        "horizon.failed-jobs.index": {
            uri: "horizon/api/jobs/failed",
            methods: ["GET", "HEAD"],
        },
        "horizon.failed-jobs.show": {
            uri: "horizon/api/jobs/failed/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "horizon.retry-jobs.show": {
            uri: "horizon/api/jobs/retry/{id}",
            methods: ["POST"],
            parameters: ["id"],
        },
        "horizon.jobs.show": {
            uri: "horizon/api/jobs/{id}",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        "horizon.index": {
            uri: "horizon/{view?}",
            methods: ["GET", "HEAD"],
            wheres: { view: "(.*)" },
            parameters: ["view"],
        },
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        "ignition.healthCheck": {
            uri: "_ignition/health-check",
            methods: ["GET", "HEAD"],
        },
        "ignition.executeSolution": {
            uri: "_ignition/execute-solution",
            methods: ["POST"],
        },
        "ignition.updateConfig": {
            uri: "_ignition/update-config",
            methods: ["POST"],
        },
        "employee.login": { uri: "employee/login", methods: ["GET", "HEAD"] },
        "employee.login.store": { uri: "employee/login", methods: ["POST"] },
        "employees.create": {
            uri: "employees/create",
            methods: ["GET", "HEAD"],
        },
        "employees.store": { uri: "employees", methods: ["POST"] },
        dashboard: { uri: "/", methods: ["GET", "HEAD"] },
        "employee.togglePushNotifications": {
            uri: "employee/toggle-push-notification",
            methods: ["POST"],
        },
        "employee.toggleEmailNotifications": {
            uri: "employee/toggle-email-notifications",
            methods: ["POST"],
        },
        "employee.logout": { uri: "employee/logout", methods: ["POST"] },
        "password.confirm": {
            uri: "employee/confirm-password",
            methods: ["GET", "HEAD"],
        },
        "password.check": {
            uri: "employee/confirm-password",
            methods: ["POST"],
        },
        "employees.index": { uri: "employees", methods: ["GET", "HEAD"] },
        "employees.show": {
            uri: "employees/{employee}",
            methods: ["GET", "HEAD"],
            parameters: ["employee"],
            bindings: { employee: "username" },
        },
        "employees.edit": {
            uri: "employees/{employee}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["employee"],
            bindings: { employee: "username" },
        },
        "employees.update": {
            uri: "employees/{employee}",
            methods: ["PUT", "PATCH"],
            parameters: ["employee"],
            bindings: { employee: "username" },
        },
        "employees.destroy": {
            uri: "employees/{employee}",
            methods: ["DELETE"],
            parameters: ["employee"],
            bindings: { employee: "username" },
        },
        "employee.tasks": {
            uri: "employees/{employee}/tasks",
            methods: ["GET", "HEAD"],
            parameters: ["employee"],
            bindings: { employee: "username" },
        },
        "tasks.store": { uri: "tasks", methods: ["POST"] },
        "tasks.update": {
            uri: "tasks/{task}",
            methods: ["PUT", "PATCH"],
            parameters: ["task"],
            bindings: { task: "id" },
        },
        "tasks.destroy": {
            uri: "tasks/{task}",
            methods: ["DELETE"],
            parameters: ["task"],
            bindings: { task: "id" },
        },
    },
};

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
